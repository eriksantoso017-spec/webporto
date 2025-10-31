import { getAllPosts, getPostById } from "@/lib/markdown";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Get single post
    const post = getPostById(id);
    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    return Response.json(post);
  }

  // Get all posts
  const posts = getAllPosts();
  return Response.json(posts);
}

