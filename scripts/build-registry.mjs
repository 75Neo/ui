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
const STYLESHEET = "src/styles/registry.css";
const VAR_TARGETS = { theme: null, light: ":root", dark: ".dark" };

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

const ICONS = { react: "lucide-react", vue: "@lucide/vue" };

function resolveDependencies(dependencies, framework) {
  return dependencies?.map((d) =>
    d.replaceAll("{framework}", framework).replaceAll("{icons}", ICONS[framework]),
  );
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

function declarations(entries, indent) {
  return Object.entries(entries).map(([key, value]) => `${indent}${key}: ${value};`);
}

function block(selector, body, indent) {
  return [`${indent}${selector} {`, ...body, `${indent}}`];
}

function rule(selector, body, indent) {
  const lines = Object.entries(body).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? rule(key, value, `${indent}  `)
      : [`${indent}  ${key}: ${value};`],
  );
  return block(selector, lines, indent);
}

function stylesheet(metas) {
  const themeVars = {};
  const scoped = {};
  const keyframes = [];
  const other = [];

  for (const meta of metas) {
    for (const [group, entries] of Object.entries(meta.cssVars ?? {})) {
      if (!(group in VAR_TARGETS)) continue;
      const target = VAR_TARGETS[group];
      if (target === null) Object.assign(themeVars, entries);
      else Object.assign((scoped[target] ??= {}), entries);
    }
    for (const [selector, body] of Object.entries(meta.css ?? {})) {
      if (!selector.startsWith("@keyframes")) {
        other.push([selector, body]);
      } else if (!keyframes.some(([name]) => name === selector)) {
        keyframes.push([selector, body]);
      }
    }
  }

  const theme = [
    ...declarations(themeVars, "  "),
    ...keyframes.flatMap(([selector, body]) => ["", ...rule(selector, body, "  ")]),
  ];

  const sections = [];
  if (theme.length > 0) sections.push(block("@theme inline", theme, "").join("\n"));
  for (const [selector, entries] of Object.entries(scoped)) {
    sections.push(block(selector, declarations(entries, "  "), "").join("\n"));
  }
  for (const [selector, body] of other) {
    if (Object.keys(body).length === 0) {
      sections.push(`${selector};`);
    } else {
      sections.push(rule(selector, body, "").join("\n"));
    }
  }

  return sections.length > 0 ? `${sections.join("\n\n")}\n` : "";
}

function buildItem(meta, framework) {
  const { name, dependencies, files, ...rest } = meta;
  const resolved = files ?? [...uiFiles(name, framework), ...libFiles(name)];
  const hasCss =
    (meta.css && Object.keys(meta.css).length > 0) ||
    (meta.cssVars && Object.keys(meta.cssVars).length > 0);

  if (resolved.length === 0 && !hasCss) {
    throw new Error(`No files found for registry item "${name}" (${framework}).`);
  }

  return {
    name,
    ...rest,
    ...(dependencies ? { dependencies: resolveDependencies(dependencies, framework) } : {}),
    ...(resolved.length > 0 ? { files: resolved } : {}),
  };
}

const metas = await readMeta();

await writeFile(STYLESHEET, stylesheet(metas));
console.log(`${STYLESHEET}`);

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
