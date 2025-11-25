import { getAllPostIds, getPostById } from "@/lib/markdown";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

// Enable ISR - regenerate every hour (3600 seconds)
export const revalidate = 3600;

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({ params }) {
  const post = getPostById(params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eriksant.com";

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
    keywords: post.tags || [],
    authors: [{ name: "Erik Santoso" }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.date,
      url: `${baseUrl}/blog/${params.slug}`,
      siteName: "Erik Santoso Portfolio",
      images: [
        {
          url: post.thumbnail ? `${baseUrl}${post.thumbnail}` : `${baseUrl}/logo-erik-512.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: [post.thumbnail ? `${baseUrl}${post.thumbnail}` : `${baseUrl}/logo-erik-512.png`],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostById(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
