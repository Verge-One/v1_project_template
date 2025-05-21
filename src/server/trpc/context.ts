import "server-only";
export async function createContext() {
  // include Auth Sesssion or else
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
