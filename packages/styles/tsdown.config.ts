import { defineLibrary } from "@75neo/tooling/tsdown";

export default defineLibrary({
  entry: ["./src/index.ts", "./src/css/index.css"],
  exports: {
    customExports(exports) {
      delete exports["./style.css"];
      exports["."] = {
        types: "./dist/index.d.ts",
        style: "./dist/style.css",
        default: "./dist/index.js",
      };
      return exports;
    },
  },
});
