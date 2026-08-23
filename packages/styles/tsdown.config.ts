import { defineLibrary } from "@75neo/tooling/tsdown";

export default defineLibrary({
  exports: {
    customExports: { "./css": "./src/css/index.css" },
  },
});
