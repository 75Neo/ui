import { defineLibrary } from "@75neo/tooling/tsdown";
import Vue from "unplugin-vue/rolldown";

export default defineLibrary({
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
});
