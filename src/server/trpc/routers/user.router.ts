// User Router
import "server-only";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { userService } from "@/server/services/user.service";

export const userRouter = router({
  getAll: publicProcedure
    //.output() // zod validation
    .query(userService.getAllUsers),
});
