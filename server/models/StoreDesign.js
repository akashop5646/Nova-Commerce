import mongoose from "mongoose";

const storeDesignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  websiteId: { type: String, default: "default", index: true },
  templateId: { type: String, default: "" },

  theme: {
    colors: {
      primary: { type: String, default: "#18181B" },
      secondary: { type: String, default: "#71717A" },
      accent: { type: String, default: "#D97706" },
      background: { type: String, default: "#FFFFFF" },
      surface: { type: String, default: "#FAFAFA" },
      text: { type: String, default: "#18181B" },
    },
    typography: {
      headingFont: { type: String, default: "Inter" },
      bodyFont: { type: String, default: "Inter" },
      headingSize: { type: String, default: "default" },
      bodySize: { type: String, default: "default" },
    },
    buttons: {
      style: {
        type: String,
        enum: ["rounded", "square", "pill"],
        default: "rounded",
      },
      shadow: { type: Boolean, default: false },
    },
    cards: {
      radius: { type: Number, default: 12 },
      shadow: { type: Boolean, default: true },
      border: { type: Boolean, default: false },
    },
    animations: { type: String, default: "fade" },
  },

  pages: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      slug: { type: String, required: true },
      isVisible: { type: Boolean, default: true },
      sections: [{ type: mongoose.Schema.Types.Mixed }],
    },
  ],

  // Publishing workflow
  published: { type: mongoose.Schema.Types.Mixed, default: null },
  publishedAt: { type: Date, default: null },

  // Versioning
  version: { type: Number, default: 1 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Auto-update `updatedAt` on save
storeDesignSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("StoreDesign", storeDesignSchema);
