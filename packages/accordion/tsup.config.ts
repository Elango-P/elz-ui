import { defineConfig } from "tsup";

export default defineConfig({
  banner: { js: '"use client";' },
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@elz-ui/core"],
});
