import mongoose from "mongoose";

const programmingLangSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    search: { type: String, required: true, lowercase: true },
    type: { type: String },
    extensions: [String],
    key: Number,
  },
  { timestamps: true }
);

const ProgrammingLang = mongoose.model(
  "ProgrammingLang",
  programmingLangSchema
);

export default ProgrammingLang;
