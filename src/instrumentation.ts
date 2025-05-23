export async function register() {
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "nodejs") {
    const { checkEnv } = await import("@/utils/checkEnv");
    await checkEnv();
  }
}
