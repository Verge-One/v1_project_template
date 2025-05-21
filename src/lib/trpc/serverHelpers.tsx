// lib/serverHelpers.ts
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/trpc/_app";
import { createContext } from "@/server/trpc/context";
import SuperJSON from "superjson";
import { QueryClient } from "@tanstack/react-query";

export async function getServerHelpers() {
  return createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
    queryClient: new QueryClient(),
  });
}
