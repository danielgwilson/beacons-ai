import { spawnSync } from "node:child_process";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

function hasDatabaseEnv() {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_PRISMA_URL,
  ];
  return candidates.some((v) => typeof v === "string" && v.trim().length > 0);
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (hasDatabaseEnv()) {
  console.log("[vercel-build] Running migrations (drizzle-kit migrate)...");
  run("pnpm", ["exec", "drizzle-kit", "migrate"]);
} else {
  console.log(
    "[vercel-build] No database env detected (DATABASE_URL/POSTGRES_URL...). Skipping migrations.",
  );
  console.log(
    "[vercel-build] Provision Vercel Postgres (Neon) and set env vars to enable app features.",
  );
}

console.log("[vercel-build] Building Next.js app...");
run("pnpm", ["exec", "next", "build"]);
