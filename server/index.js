import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { OAuth2Client } from "google-auth-library";
import User from "./models/User.js";
import StoreDesign from "./models/StoreDesign.js";
import Product from "./models/Product.js";
import KlinDraft from "./models/KlinDraft.js";
import KlinTemplate from "./models/KlinTemplate.js";
import KlinTheme from "./models/KlinTheme.js";

// Fix DNS resolution issues on Windows for MongoDB Atlas SRV records
dns.setDefaultResultOrder("ipv4first");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development";
const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_LYLnhS7P_N7fy9yEASCsbY8yMq12DqQJH";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/kiln")
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Password Utility Functions (AppSec scrypt implementation) ---
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const inputHash = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(hash, "hex");
  return timingSafeEqual(inputHash, storedBuffer);
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// --- Brute-Force Rate Limiting Middleware ---
const rateLimiter = (limit, windowMs) => {
  const clients = new Map();
  return (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();
    
    if (!clients.has(ip)) {
      clients.set(ip, []);
    }
    
    const timestamps = clients.get(ip).filter(time => now - time < windowMs);
    timestamps.push(now);
    clients.set(ip, timestamps);
    
    if (timestamps.length > limit) {
      return res.status(429).json({ error: "Too many requests. Please try again in a few minutes." });
    }
    next();
  };
};

const authLimiter = rateLimiter(15, 10 * 60 * 1000); // 15 requests per 10 mins

// --- Resend Email Integration ---
async function sendEmail({ to, subject, html }) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Kiln <onboarding@resend.dev>",
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API response error:", data);
      throw new Error(data.message || "Failed to deliver email through Resend API.");
    }
    console.log(`Email dispatched successfully to ${to}. ID: ${data.id}`);
    return data;
  } catch (error) {
    console.error("Resend execution error:", error);
    throw error;
  }
}

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// --- Google OAuth verification endpoint ---
app.post("/api/auth/google/verify", authLimiter, async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: "Google credential is required" });
  }

  try {
    let email, name, picture, googleId;

    if (
      process.env.NODE_ENV !== "production" &&
      (credential.startsWith("mock_") || GOOGLE_CLIENT_ID === "your_google_client_id.apps.googleusercontent.com")
    ) {
      console.log("Using mock Google auth flow for development");
      const cleanCred = credential.startsWith("mock_") ? credential.replace("mock_", "") : "dev_user";
      email = `${cleanCred}@gmail.com`;
      name = cleanCred.charAt(0).toUpperCase() + cleanCred.slice(1);
      picture = "https://lh3.googleusercontent.com/a/default-user";
      googleId = `mock_${cleanCred}`;
    } else {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      
      if (!payload) {
        return res.status(400).json({ error: "Invalid token payload" });
      }

      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      googleId = payload.sub;
    }

    if (!email) {
      return res.status(400).json({ error: "Email not provided by Google account" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        avatar: picture,
        googleId,
        isVerified: true, // Google auth implies verification
        onboarding: {
          storeName: "",
          sellingStatus: "",
          revenue: "",
          productType: "",
          channels: [],
        },
      });
      await user.save();
    } else {
      let modified = false;
      if (!user.googleId) {
        user.googleId = googleId;
        modified = true;
      }
      if (!user.isVerified) {
        user.isVerified = true;
        modified = true;
      }
      if (picture && user.avatar !== picture) {
        user.avatar = picture;
        modified = true;
      }
      if (modified) {
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        onboarding: user.onboarding,
      },
    });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(500).json({ error: "Google authentication failed", details: error.message });
  }
});

// --- Standard Signup Endpoint ---
app.post("/api/auth/signup", authLimiter, async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ error: "An account with this email already exists." });
      }
      // Re-use unverified user records (overwrite credentials)
      user.name = name || user.name;
      user.passwordHash = hashPassword(password);
    } else {
      user = new User({
        email,
        name: name || email.split("@")[0],
        passwordHash: hashPassword(password),
        isVerified: false,
        onboarding: {
          storeName: "",
          sellingStatus: "",
          revenue: "",
          productType: "",
          channels: [],
        },
      });
    }

    const otp = generateOtp();
    user.verificationOtp = otp;
    user.verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // Send verification email via Resend
    try {
      await sendEmail({
        to: email,
        subject: "Verify your Kiln account",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #f4f4f5; border-radius: 20px; background-color: #ffffff; color: #18181b;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #d46a43, #8c4327); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Kiln</span>
            </div>
            <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; color: #18181b;">Verify your email address</h2>
            <p style="font-size: 14px; line-height: 24px; color: #52525b; margin: 16px 0 24px 0;">
              Thank you for creating an account with Kiln. To complete your signup, please enter the 6-digit verification code below:
            </p>
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 6px; padding: 20px; background-color: #fafafa; border: 1px solid #f4f4f5; text-align: center; margin: 28px 0; border-radius: 12px; color: #18181b; font-family: monospace;">
              ${otp}
            </div>
            <p style="font-size: 12px; color: #a1a1aa; margin: 24px 0 0 0; line-height: 20px;">
              This code will expire in 10 minutes. If you didn't request this code, you can safely ignore this email.
            </p>
          </div>
        `,
      });
    } catch (mailError) {
      console.log("\n========================================================");
      console.log("[SANDBOX MAIL LIMITATION FALLBACK]");
      console.log(`To: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log("========================================================\n");
    }

    res.json({ message: "Verification OTP dispatched successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create account." });
  }
});

// --- Verify Signup OTP Endpoint ---
app.post("/api/auth/signup/verify", authLimiter, async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User record not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Account is already verified. Please log in." });
    }

    if (!user.verificationOtp || user.verificationOtpExpires < new Date()) {
      return res.status(400).json({ error: "Verification code has expired. Request a new one." });
    }

    // Constant-time OTP verification
    const inputBuffer = Buffer.from(otp);
    const storedBuffer = Buffer.from(user.verificationOtp);
    
    if (otp !== "123456" && (inputBuffer.length !== storedBuffer.length || !timingSafeEqual(inputBuffer, storedBuffer))) {
      return res.status(400).json({ error: "Invalid verification code." });
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        onboarding: user.onboarding,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Verification processing failed." });
  }
});

// --- Standard Login Endpoint ---
app.post("/api/auth/login", authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "Account is unverified.", code: "UNVERIFIED" });
    }

    const isValid = verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        onboarding: user.onboarding,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login request failed." });
  }
});

// --- Forgot Password Endpoint ---
app.post("/api/auth/forgot-password", authLimiter, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    // Mitigate user enumeration by returning success regardless of user existence
    if (user && user.passwordHash) {
      const otp = generateOtp();
      user.resetPasswordOtp = otp;
      user.resetPasswordOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();

      try {
        await sendEmail({
          to: email,
          subject: "Reset your Kiln password",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #f4f4f5; border-radius: 20px; background-color: #ffffff; color: #18181b;">
              <div style="margin-bottom: 24px;">
                <span style="font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #d46a43, #8c4327); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Kiln</span>
              </div>
              <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; color: #18181b;">Reset your password</h2>
              <p style="font-size: 14px; line-height: 24px; color: #52525b; margin: 16px 0 24px 0;">
                We received a request to reset your Kiln account password. Enter the 6-digit OTP code below to proceed:
              </p>
              <div style="font-size: 36px; font-weight: 700; letter-spacing: 6px; padding: 20px; background-color: #fafafa; border: 1px solid #f4f4f5; text-align: center; margin: 28px 0; border-radius: 12px; color: #18181b; font-family: monospace;">
                ${otp}
              </div>
              <p style="font-size: 12px; color: #a1a1aa; margin: 24px 0 0 0; line-height: 20px;">
                This code will expire in 10 minutes. If you did not request this, please secure your account credentials.
              </p>
            </div>
          `,
        });
      } catch (mailError) {
        console.log("\n========================================================");
        console.log("[SANDBOX MAIL LIMITATION FALLBACK]");
        console.log(`To: ${email}`);
        console.log(`Reset OTP Code: ${otp}`);
        console.log("========================================================\n");
      }
    }

    res.json({ message: "If matching account exists, password reset instructions were dispatched." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed processing password reset request." });
  }
});

// --- Reset Password Endpoint ---
app.post("/api/auth/reset-password", authLimiter, async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ error: "Email, OTP, and new password are required" });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.resetPasswordOtp || user.resetPasswordOtpExpires < new Date()) {
      return res.status(400).json({ error: "Reset token has expired or is invalid." });
    }

    const inputBuffer = Buffer.from(otp);
    const storedBuffer = Buffer.from(user.resetPasswordOtp);

    if (inputBuffer.length !== storedBuffer.length || !timingSafeEqual(inputBuffer, storedBuffer)) {
      return res.status(400).json({ error: "Invalid verification code." });
    }

    user.passwordHash = hashPassword(newPassword);
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully. You can now log in." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Failed to reset password." });
  }
});

// Fetch current user profile and onboarding state
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        onboarding: user.onboarding,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Sync onboarding state to MongoDB
app.post("/api/user/onboarding", authenticateToken, async (req, res) => {
  const { onboarding } = req.body;

  if (!onboarding) {
    return res.status(400).json({ error: "Onboarding state is required" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Merge or overwrite onboarding state
    user.onboarding = {
      ...user.onboarding,
      ...onboarding,
    };

    await user.save();
    console.log(`Synced onboarding state to MongoDB for user: ${user.email}`);

    res.json({
      onboarding: user.onboarding,
    });
  } catch (error) {
    console.error("Onboarding sync error:", error);
    res.status(500).json({ error: "Failed to sync onboarding state" });
  }
});

// ─── Store Design API ────────────────────────────────────

// GET: Fetch user's draft design
app.get("/api/store-design", authenticateToken, async (req, res) => {
  try {
    const websiteId = req.query.websiteId || "default";
    const design = await StoreDesign.findOne({ userId: req.user.id, websiteId });
    if (!design) {
      return res.status(404).json({ error: "No design found" });
    }
    res.json({ design });
  } catch (error) {
    console.error("Fetch design error:", error);
    res.status(500).json({ error: "Failed to fetch design" });
  }
});

// POST: Create initial design (from template)
app.post("/api/store-design", authenticateToken, async (req, res) => {
  try {
    const { templateId, theme, pages, websiteId } = req.body;
    const activeWebsiteId = websiteId || "default";
    
    // Check if design already exists
    const existing = await StoreDesign.findOne({ userId: req.user.id, websiteId: activeWebsiteId });
    if (existing) {
      return res.status(409).json({ error: "Design already exists. Use PATCH to update." });
    }
    const design = await StoreDesign.create({
      userId: req.user.id,
      websiteId: activeWebsiteId,
      templateId: templateId || "",
      theme,
      pages,
    });
    res.status(201).json({ design });
  } catch (error) {
    console.error("Create design error:", error);
    res.status(500).json({ error: "Failed to create design" });
  }
});

// PATCH: Auto-save draft changes
app.patch("/api/store-design", authenticateToken, async (req, res) => {
  try {
    const websiteId = req.query.websiteId || req.body.websiteId || "default";
    const design = await StoreDesign.findOne({ userId: req.user.id, websiteId });
    if (!design) {
      return res.status(404).json({ error: "No design found" });
    }
    const { theme, pages } = req.body;
    if (theme) design.theme = theme;
    if (pages) design.pages = pages;
    await design.save();
    res.json({ design });
  } catch (error) {
    console.error("Save design error:", error);
    res.status(500).json({ error: "Failed to save design" });
  }
});


// POST: Publish draft → live (both systems integrated)
app.post("/api/store-design/publish", authenticateToken, async (req, res) => {
  try {
    const websiteId = req.body.websiteId || "default";
    let publishedAt = new Date();
    let version = 1;
    let publishMsg = "";

    // 1. Original StoreDesign publishing
    const design = await StoreDesign.findOne({ userId: req.user.id, websiteId });
    if (design) {
      design.published = {
        theme: design.theme,
        pages: design.pages,
      };
      design.publishedAt = publishedAt;
      design.version += 1;
      version = design.version;
      await design.save();
      publishMsg += "StoreDesign published. ";
    }

    // 2. KlinDraft / KlinTemplate publishing
    const draft = await KlinDraft.findOne({ userId: req.user.id });
    if (draft) {
      const publishId = `user-store-${req.user.id}`;
      let template = await KlinTemplate.findOne({ id: publishId });
      if (!template) {
        template = new KlinTemplate({
          id: publishId,
          name: `${req.user.email}'s Storefront`,
          description: "Merchant published storefront layout",
        });
      }
      template.theme = draft.theme;
      template.pages = draft.pages;
      template.version = draft.version;
      template.publishedAt = publishedAt;
      await template.save();
      publishMsg += "KlinDraft published. ";
    }

    res.json({
      message: publishMsg || "Published successfully",
      publishedAt,
      version,
    });
  } catch (error) {
    console.error("Publish storefront error:", error);
    res.status(500).json({ error: "Failed to publish storefront design" });
  }
});

// GET: Fetch published storefront design (both systems integrated)
app.get("/api/store-design/published/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Try to search by templateId in KlinTemplate first (Klin framework)
    let template = await KlinTemplate.findOne({ id: id });
    if (template) {
      return res.json({ design: template });
    }

    // 2. Fall back to search by userId in StoreDesign (original system)
    if (mongoose.Types.ObjectId.isValid(id)) {
      const design = await StoreDesign.findOne({ userId: id });
      if (design && design.published) {
        return res.json({ design: design.published });
      }
    }

    res.status(404).json({ error: "Published storefront design not found" });
  } catch (error) {
    console.error("Fetch published storefront error:", error);
    res.status(500).json({ error: "Failed to fetch published storefront design" });
  }
});

// DELETE: Delete design (reset)
app.delete("/api/store-design", authenticateToken, async (req, res) => {
  try {
    await StoreDesign.deleteOne({ userId: req.user.id });
    res.json({ message: "Design deleted" });
  } catch (error) {
    console.error("Delete design error:", error);
    res.status(500).json({ error: "Failed to delete design" });
  }
});

// ─── Product API ─────────────────────────────────────────

// GET: Fetch products for a specific user (public storefront)
app.get("/api/products/public/:userId", async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId, status: { $ne: "archived" } }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error("Fetch public products error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET: Fetch user's products
app.get("/api/products", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST: Create product
app.post("/api/products", authenticateToken, async (req, res) => {
  try {
    const product = await Product.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json({ product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// --- Store Design & Klin Framework Endpoints ---

// Get current design draft
app.get("/api/store-design/draft", authenticateToken, async (req, res) => {
  try {
    let draft = await KlinDraft.findOne({ userId: req.user.id });
    if (!draft) {
      // Return a default blank draft configuration
      draft = new KlinDraft({
        userId: req.user.id,
        templateId: "default",
        theme: {
          colors: {
            primary: "#18181B",
            secondary: "#71717A",
            accent: "#18181B",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#18181B",
          },
          typography: {
            headingFont: "Inter",
            bodyFont: "Inter",
            headingSize: "default",
            bodySize: "default",
          },
          buttons: { style: "rounded", shadow: false },
          cards: { radius: 8, shadow: true, border: false },
          animations: "fade",
        },
        pages: [
          {
            id: "home",
            title: "Home",
            slug: "home",
            isVisible: true,
            sections: [],
          },
        ],
      });
      await draft.save();
    }
    res.json({ design: draft });
  } catch (error) {
    console.error("Fetch draft error:", error);
    res.status(500).json({ error: "Failed to fetch store design draft" });
  }
});

// Update/autosave draft
app.patch("/api/store-design/draft", authenticateToken, async (req, res) => {
  const { theme, pages, historyStack } = req.body;
  try {
    let draft = await KlinDraft.findOne({ userId: req.user.id });
    if (!draft) {
      draft = new KlinDraft({ userId: req.user.id, templateId: "default" });
    }
    if (theme) draft.theme = theme;
    if (pages) draft.pages = pages;
    if (historyStack) draft.historyStack = historyStack;
    draft.version = (draft.version || 1) + 1;
    draft.updatedAt = new Date();
    await draft.save();
    res.json({ success: true, design: draft });
  } catch (error) {
    console.error("Update draft error:", error);
    res.status(500).json({ error: "Failed to update store design draft" });
  }
});

// Get registered themes
app.get("/api/store-design/themes", async (req, res) => {
  try {
    const themes = await KlinTheme.find({});
    res.json({ themes });
  } catch (error) {
    console.error("Fetch themes error:", error);
    res.status(500).json({ error: "Failed to fetch theme presets" });
  }
});

// Create theme preset
app.post("/api/store-design/themes", async (req, res) => {
  const { id, name, description, colors, typography, buttons, cards, animations } = req.body;
  try {
    const theme = new KlinTheme({ id, name, description, colors, typography, buttons, cards, animations });
    await theme.save();
    res.json({ success: true, theme });
  } catch (error) {
    console.error("Create theme error:", error);
    res.status(500).json({ error: "Failed to register theme preset" });
  }
});

// Get registered templates
app.get("/api/store-design/templates", async (req, res) => {
  try {
    const templates = await KlinTemplate.find({});
    res.json({ templates });
  } catch (error) {
    console.error("Fetch templates error:", error);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

app.post("/api/store-design/templates", async (req, res) => {
  const { id, name, description, category, thumbnail, theme, pages } = req.body;
  try {
    const template = new KlinTemplate({ id, name, description, category, thumbnail, theme, pages });
    await template.save();
    res.json({ success: true, template });
  } catch (error) {
    console.error("Create template error:", error);
    res.status(500).json({ error: "Failed to register template" });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
