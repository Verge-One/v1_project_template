import "server-only";
import { db } from "@/server/db/index";
import { User, users } from "../db/schemas";
import { eq } from "drizzle-orm";

export const userService = {
  getAllUsersWithPosts: async () => {
    return await db.query.users.findMany({
      with: {
        posts: true,
      },
    });
  },
  updateUserById: async (id: number, values: Partial<User>) => {
    const [newUser] = await db
      .update(users)
      .set(values)
      .where(eq(users.id, id))
      .returning();
    return newUser;
  },
};
