import type { CssBlock } from "./schema.js";

function rule(selector: string, body: CssBlock, indent: string): string[] {
  const lines = Object.entries(body).flatMap(([key, value]) =>
    typeof value === "string" ? [`${indent}  ${key}: ${value};`] : rule(key, value, `${indent}  `),
  );
  return [`${indent}${selector} {`, ...lines, `${indent}}`];
}

export function serialize(css: CssBlock): string {
  const sections = Object.entries(css).map(([selector, body]) => {
    if (typeof body === "string") return `${selector}: ${body};`;
    return Object.keys(body).length === 0 ? `${selector};` : rule(selector, body, "").join("\n");
  });
  return sections.length > 0 ? `${sections.join("\n\n")}\n` : "";
}

export function withImport(source: string, specifier: string): string {
  if (source.includes(`"${specifier}"`) || source.includes(`'${specifier}'`)) return source;

  const lines = source.split("\n");
  const last = lines.reduce(
    (index, line, position) => (line.trimStart().startsWith("@import ") ? position : index),
    -1,
  );

  if (last === -1) return `@import "${specifier}";\n\n${source}`;
  lines.splice(last + 1, 0, `@import "${specifier}";`);
  return lines.join("\n");
}

export function withTheme(source: string, css: CssBlock, marker: string): string {
  if (source.includes(marker)) return source;
  return `${source.replace(/\s*$/, "\n")}\n${marker}\n${serialize(css)}`;
}
