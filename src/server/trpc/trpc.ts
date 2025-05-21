import "server-only";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson"; // Für Date-Objekte etc.
import { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
