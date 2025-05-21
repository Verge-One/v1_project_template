const requiredEnvVars = ["MONGODB_URI", "DB_NAME"];

export async function checkEnv() {
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      throw new Error(`${varName} fehlt in .env!!!`);
    }
  }
  if (requiredEnvVars.some((varName) => !process.env[varName])) {
    process.exit(1);
  }
}
