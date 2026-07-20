import { defineConfig } from "tsup";

export default defineConfig({
  banner: { js: '"use client";' },
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@elz-ui/core", "@radix-ui/react-slot"],
});
