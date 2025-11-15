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

export default function BlogPage({ searchParams }) {
  const allPosts = getAllPosts();
  const page = parseInt(searchParams?.page || "1", 10);
  const postsPerPage = 5;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const blogPosts = allPosts.slice(startIndex, endIndex);

  return (
    <BlogListClient
      blogPosts={blogPosts}
      allPosts={allPosts}
      currentPage={page}
      totalPages={totalPages}
      totalPosts={allPosts.length}
    />
  );
}
