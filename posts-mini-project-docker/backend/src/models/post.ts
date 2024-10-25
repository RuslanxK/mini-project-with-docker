import { Schema, model, Document } from "mongoose";
import { IPost } from "../interfaces/post";

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
