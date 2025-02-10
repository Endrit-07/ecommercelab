import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "PostCategory",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
