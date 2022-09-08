import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    fullName: String,
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    pswd: { type: String, required: true, trim: true },

    roles: {
      Admin: Number,
      User: { type: Number, default: 2001 },
      Contributor: Number,
      Moderator: Number,
      Editor: Number,
    },
    labels: [String],
    snippets: [String],
    followers: [String],
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
