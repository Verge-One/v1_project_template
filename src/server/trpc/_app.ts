import "server-only";
import { router } from "./trpc";
import { userRouter } from "./routers/user.router";

export const appRouter = router({
  users: userRouter,
  //weiter Router
});

export type AppRouter = typeof appRouter;
