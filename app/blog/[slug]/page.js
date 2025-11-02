import { getAllPostIds, getPostById } from "@/lib/markdown";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({ params }) {
  const post = getPostById(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Erik Santoso Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.date,
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
