import { globSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FRAMEWORKS = {
  react: {
    out: "registry.react.json",
    schema: "https://ui.shadcn.com/schema/registry.json",
  },
  vue: {
    out: "registry.vue.json",
    schema: "https://shadcn-vue.com/schema/registry.json",
  },
};

const NAME = "75neo";
const HOMEPAGE = "https://75neo-ui.pages.dev";
const ORDER = ["registry:theme", "registry:lib", "registry:ui"];

const sortPaths = (paths) => paths.map((p) => p.split(path.sep).join("/")).sort();

function uiFiles(name, framework) {
  const dir = `registry/${framework}/ui/${name}`;
  return sortPaths(globSync(`${dir}/**/*.{ts,tsx,vue}`)).map((p) => ({
    path: p,
    type: "registry:ui",
  }));
}

function libFiles(name) {
  return sortPaths(globSync(`registry/shared/lib/${name}.*`)).map((p) => ({
    path: p,
    type: "registry:lib",
  }));
}

function resolveDependencies(dependencies, framework) {
  return dependencies?.map((d) => d.replaceAll("{framework}", framework));
}

async function readMeta() {
  const files = sortPaths(globSync("registry/meta/*.json"));
  const metas = [];
  for (const file of files) {
    const meta = JSON.parse(await readFile(file, "utf8"));
    metas.push({ name: path.basename(file, ".json"), ...meta });
  }
  return metas.sort((a, b) => {
    const rank = ORDER.indexOf(a.type) - ORDER.indexOf(b.type);
    return rank === 0 ? a.name.localeCompare(b.name) : rank;
  });
}

function buildItem(meta, framework) {
  const { name, dependencies, files, ...rest } = meta;
  const resolved = files ?? [...uiFiles(name, framework), ...libFiles(name)];

  if (resolved.length === 0) {
    throw new Error(`No files found for registry item "${name}" (${framework}).`);
  }

  return {
    name,
    ...rest,
    ...(dependencies ? { dependencies: resolveDependencies(dependencies, framework) } : {}),
    files: resolved,
  };
}

const metas = await readMeta();

for (const [framework, { out, schema }] of Object.entries(FRAMEWORKS)) {
  const registry = {
    $schema: schema,
    name: NAME,
    homepage: HOMEPAGE,
    items: metas.map((meta) => buildItem(meta, framework)),
  };
  await writeFile(out, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`${out}  ${registry.items.length} items`);
}
