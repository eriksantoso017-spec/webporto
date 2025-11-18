import { getAllPosts } from "@/lib/markdown";
import BlogListClient from "./BlogListClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.com";

export const metadata = {
  title: "Blog",
  description:
    "Blog posts by Erik Santoso covering my opinion about various topics.",
  keywords: [
    "Erik Santoso",
    "Blog",
    "Technology",
    "Design",
    "Cyber Security",
    "OSINT",
    "Finance",
    "Articles",
  ],
  authors: [{ name: "Erik Santoso" }],
  openGraph: {
    title: "Blog - Erik Santoso Portfolio",
    description:
      "Blog posts by Erik Santoso covering my opinion about various topics.",
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
    title: "Blog - Erik Santoso Portfolio",
    description:
      "Blog posts by Erik Santoso covering my opinion about various topics.",
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
