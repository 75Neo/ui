import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: "esm",
  target: "node20",
  platform: "node",
  dts: true,
  clean: true,
  treeshake: true,
  unbundle: false,
});
