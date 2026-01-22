import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nodeMajor = Number.parseInt(
  process.versions.node.split(".")[0] ?? "0",
  10,
);
const pool = nodeMajor >= 24 ? "vmForks" : "forks";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["e2e/**", "**/node_modules/**", "**/.next/**"],
    pool,
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: path.resolve(__dirname, "./src/$1"),
      },
    ],
  },
});
