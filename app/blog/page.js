import { getAllPosts } from "@/lib/markdown";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "Blog - Erik Santoso Portfolio",
  description:
    "Blog posts by Erik Santoso covering various topics about web development, technology, and personal experiences.",
  openGraph: {
    title: "Blog - Erik Santoso Portfolio",
    description:
      "Blog posts by Erik Santoso covering various topics about web development, technology, and personal experiences.",
    type: "website",
  },
};

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return <BlogListClient blogPosts={blogPosts} />;
}
