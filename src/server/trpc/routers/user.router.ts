// User Router
import "server-only";
import { z } from "zod/v4";
import { publicProcedure, router } from "../trpc";
import { userService } from "@/server/services/user.service";
import { users } from "@/server/db/schemas";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
export const userRouter = router({
  getAllWithPosts: publicProcedure.query(userService.getAllUsersWithPosts),
  updateUserById: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        values: createInsertSchema(users).partial(),
      })
    )
    .output(createSelectSchema(users))
    .mutation(
      async ({ input }) =>
        await userService.updateUserById(input.id, input.values)
    ),
});
