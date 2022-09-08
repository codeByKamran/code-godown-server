import mongoose from "mongoose";

const labelsScheme = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    userID: { type: String, required: true },
    snippets: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Label", labelsScheme);
