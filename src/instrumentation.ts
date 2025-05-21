export async function register() {
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "nodejs") {
    const { checkEnv } = await import("@/utils/checkEnv");
    const { connect } = await import("@/server/db/connect");
    await checkEnv();
    await connect();
  }
}
