import { spawn } from "node:child_process";

const port = process.env.PORT || "3000";
const host = process.env.HOST || "0.0.0.0";
const command = process.platform === "win32" ? "npx.cmd" : "npx";

const child = spawn(command, ["next", "start", "-p", port, "-H", host], {
  stdio: "inherit",
  env: process.env
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
