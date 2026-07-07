import mongoose from "mongoose";

const klinDraftSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  templateId: { type: String, required: true },
  theme: { type: Object, required: true },
  pages: { type: Array, required: true },
  historyStack: { type: Array, default: [] },
  version: { type: Number, default: 1 },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("KlinDraft", klinDraftSchema);
