import { describe, expect, it } from "vitest";
import { serialize, withImport, withTheme } from "../src/css.js";

describe("serialize", () => {
  it("writes an empty at-rule as a bare statement", () => {
    expect(serialize({ "@custom-variant dark (&:where(.dark))": {} })).toBe(
      "@custom-variant dark (&:where(.dark));\n",
    );
  });

  it("nests blocks and indents each level", () => {
    expect(serialize({ "@layer base": { ":root": { "--ui-radius": "0.25rem" } } })).toBe(
      ["@layer base {", "  :root {", "    --ui-radius: 0.25rem;", "  }", "}", ""].join("\n"),
    );
  });

  it("separates top level sections with a blank line", () => {
    const out = serialize({ ":root": { color: "red" }, ".dark": { color: "white" } });
    expect(out).toContain("}\n\n.dark {");
  });

  it("returns an empty string for empty css", () => {
    expect(serialize({})).toBe("");
  });
});

describe("withImport", () => {
  it("inserts after the last existing import", () => {
    const source = '@import "tailwindcss";\n@import "./prose.css";\n\nbody {\n}\n';
    expect(withImport(source, "@75neo/ui/animations.css")).toBe(
      '@import "tailwindcss";\n@import "./prose.css";\n@import "@75neo/ui/animations.css";\n\nbody {\n}\n',
    );
  });

  it("prepends when the file has no imports", () => {
    expect(withImport("body {\n}\n", "x.css")).toBe('@import "x.css";\n\nbody {\n}\n');
  });

  it("is idempotent", () => {
    const once = withImport('@import "tailwindcss";\n', "x.css");
    expect(withImport(once, "x.css")).toBe(once);
  });

  it("recognises a single quoted import", () => {
    const source = "@import 'x.css';\n";
    expect(withImport(source, "x.css")).toBe(source);
  });
});

describe("withTheme", () => {
  const marker = "/* 75NeoUI theme */";

  it("appends the marker and the serialized css", () => {
    const out = withTheme('@import "tailwindcss";\n', { ":root": { color: "red" } }, marker);
    expect(out).toContain(marker);
    expect(out).toContain(":root {\n  color: red;\n}");
  });

  it("does nothing when the marker is already present", () => {
    const once = withTheme("a {\n}\n", { ":root": { color: "red" } }, marker);
    expect(withTheme(once, { ":root": { color: "blue" } }, marker)).toBe(once);
  });
});
