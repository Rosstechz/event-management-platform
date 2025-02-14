import mongoose, { model, Schema } from "mongoose";

export interface BlogSchemaProps extends Document {
  title: string;
  slug: string;
  category: string;
  publishedDate: Date;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
}

const blogSchema = new Schema<BlogSchemaProps>(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model<BlogSchemaProps>("Blog", blogSchema);
export default Blog;
