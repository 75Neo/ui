import pluginBabel from "@rolldown/plugin-babel";
import { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineLibrary } from "@75neo/tooling/tsdown";

export default defineLibrary({
  plugins: [
    pluginBabel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
