import { globSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const DEMOS = "src/components/docs/demos";

const wrapper = (importPath, framework) => `---
import Demo from "./${importPath}";

interface Props {
  mode?: "none" | "visible" | "load" | "only";
}

const { mode = "visible" } = Astro.props;
---

{mode === "none" && <Demo />}
{mode === "load" && <Demo client:load />}
{mode === "visible" && <Demo client:visible />}
{mode === "only" && <Demo client:only="${framework}" />}
`;

const sources = globSync(`${DEMOS}/*/{react/*.tsx,vue/*.vue}`).map((p) =>
  String(p).split(path.sep).join("/"),
);

const expected = new Set();

for (const source of sources) {
  const framework = source.includes("/react/") ? "react" : "vue";
  const target = source.replace(/\.(tsx|vue)$/, ".astro");
  expected.add(target);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, wrapper(path.basename(source), framework));
}

for (const stale of globSync(`${DEMOS}/*/{react,vue}/*.astro`)) {
  const normalised = String(stale).split(path.sep).join("/");
  if (!expected.has(normalised)) await rm(normalised);
}

console.log(`${DEMOS}  ${sources.length} demo wrappers`);
