import { getAllPosts } from "@/lib/markdown";
import BlogListClient from "./BlogListClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.com";

export const metadata = {
  title: "Blog",
  description: "Concern and thought shared from a goy perspective.",
  keywords: ["Erik Santoso", "Blog", "Articles", "Muse", "Thought"],
  authors: [{ name: "Erik Santoso" }],
  openGraph: {
    title: "Outporing Muse",
    description: "Concern and thought shared from a goy perspective.",
    type: "website",
    url: `${baseUrl}/blog`,
    siteName: "Erik Santoso Portfolio",
    images: [
      {
        url: `${baseUrl}/logo-erik-512.png`,
        width: 1200,
        height: 630,
        alt: "Erik Santoso Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outporing Muse",
    description: "Concern and thought shared from a goy perspective.",
    images: [`${baseUrl}/logo-erik-512.png`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogPage({ searchParams }) {
  const allPosts = getAllPosts();
  const page = parseInt(searchParams?.page || "1", 10);
  const postsPerPage = 12; // 12 cards per page (3 rows with 4 columns)
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
