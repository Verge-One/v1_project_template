// User Router
import "server-only";
import { z } from "zod/v4";
import { publicProcedure, router } from "../trpc";
import { userService } from "@/server/services/user.service";
import { users } from "@/server/db/schemas";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { postsService } from "@/server/services/posts.service";
export const postsRouter = router({
  getAllWithAuthor: publicProcedure.query(postsService.getAllPostsWithAuthor),
  // updateUserById: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.number().int().positive(),
  //       values: createInsertSchema(users).partial(),
  //     })
  //   )
  //   .output(createSelectSchema(users))
  //   .mutation(
  //     async ({ input }) =>
  //       await userService.updateUserById(input.id, input.values)
  //   ),
});
