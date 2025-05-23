import "server-only";
import { router } from "./trpc";
import { userRouter } from "./routers/user.router";
import { postsRouter } from "./routers/posts.router";

export const appRouter = router({
  users: userRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
