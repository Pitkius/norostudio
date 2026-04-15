import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run(command, label) {
  try {
    const { stdout, stderr } = await execAsync(command, { env: process.env });
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    return `${stdout || ""}${stderr || ""}`;
  } catch (error) {
    const stdout = error?.stdout || "";
    const stderr = error?.stderr || "";
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    const wrapped = new Error(`${label} failed`);
    wrapped.output = `${stdout}${stderr}${error?.message || ""}`;
    throw wrapped;
  }
}

function isAdvisoryLockTimeout(output = "") {
  return (
    output.includes("Error: P1002") ||
    output.includes("Timed out trying to acquire a postgres advisory lock")
  );
}

async function runMigrateWithRetry() {
  const maxAttempts = 4;
  const retryDelayMs = 5000;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await run("npx prisma migrate deploy", "prisma migrate deploy");
      return;
    } catch (error) {
      const output = error?.output || error?.message || "";
      const canRetry = isAdvisoryLockTimeout(output) && attempt < maxAttempts;
      if (!canRetry) throw error;

      console.log(
        `[prebuild] Prisma migrate advisory lock timeout (attempt ${attempt}/${maxAttempts}). Retrying in ${
          retryDelayMs / 1000
        }s...`
      );
      await sleep(retryDelayMs);
    }
  }
}

async function main() {
  await run("npx prisma generate", "prisma generate");
  await runMigrateWithRetry();
  await run("node prisma/seed.mjs", "prisma seed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
