import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    restoreMocks: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: [...configDefaults.exclude, "**.spec.ts"],
    environmentMatchGlobs: [
      // all component tests will run in happy-dom
      ["**/?(*.)+(spec|test).[jt]sx", "happy-dom"],
      // all function tests will run in node
      ["**/?(*.)+(spec|test).[jt]s", "node"],
    ],
    coverage: {
      provider: "v8",
      reporter: ["clover", "json", "lcov", "text", "json-summary"],
    },
  },
});
