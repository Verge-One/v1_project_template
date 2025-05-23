import "server-only";
import { db } from "@/server/db/index";
import { posts, User, users } from "../db/schemas";
import { asc, eq } from "drizzle-orm";

export const postsService = {
  getAllPostsWithAuthor: async () => {
    return await db.query.posts.findMany({
      with: { author: true },
      orderBy: [asc(posts.id)],
    });
  },
};
