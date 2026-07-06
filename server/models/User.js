import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  googleId: { type: String },
  passwordHash: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationOtp: { type: String },
  verificationOtpExpires: { type: Date },
  resetPasswordOtp: { type: String },
  resetPasswordOtpExpires: { type: Date },
  onboarding: {
    storeName: { type: String, default: "" },
    sellingStatus: { type: String, default: "" },
    revenue: { type: String, default: "" },
    productType: { type: String, default: "" },
    channels: [{ type: String }],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
