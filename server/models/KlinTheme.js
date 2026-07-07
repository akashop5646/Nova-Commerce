import mongoose from "mongoose";

const klinThemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  colors: { type: Object, required: true },
  typography: { type: Object, required: true },
  buttons: { type: Object, required: true },
  cards: { type: Object, required: true },
  animations: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("KlinTheme", klinThemeSchema);
