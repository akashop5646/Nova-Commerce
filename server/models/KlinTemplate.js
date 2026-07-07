import mongoose from "mongoose";

const klinTemplateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  thumbnail: { type: String },
  theme: { type: Object, required: true },
  pages: { type: Array, required: true },
  version: { type: Number, default: 1 },
  publishedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("KlinTemplate", klinTemplateSchema);
