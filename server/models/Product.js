import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  comparePrice: { type: Number },
  images: [{ type: String }],
  category: { type: String, default: "" },
  status: {
    type: String,
    enum: ["active", "draft", "archived"],
    default: "draft",
  },
  inventory: { type: Number, default: 0 },
  sku: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
