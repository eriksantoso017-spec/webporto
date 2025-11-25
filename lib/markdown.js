import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "blog");

/**
 * Get all blog posts sorted by date
 */
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
        content: matterResult.content,
      };
    })
    .sort((a, b) => {
      // Sort by date, newest first
      // Parse date strings to Date objects for proper comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Compare timestamps (newest first)
      return dateB.getTime() - dateA.getTime();
    });

  return allPostsData;
}

/**
 * Get a single post by ID
 */
export function getPostById(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  };
}

/**
 * Get all post IDs
 */
export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

