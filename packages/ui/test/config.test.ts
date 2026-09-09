import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CONFIG_FILE,
  ConfigError,
  DEFAULT_REGISTRY,
  detectCssEntry,
  detectFramework,
  detectPaths,
  readConfig,
  writeConfig,
} from "../src/config.js";
import { ValidationError } from "../src/schema.js";

const temp = () => mkdtemp(path.join(tmpdir(), "75neoui-config-"));

async function write(cwd: string, file: string, content: string): Promise<void> {
  await mkdir(path.join(cwd, path.dirname(file)), { recursive: true });
  await writeFile(path.join(cwd, file), content);
}

describe("detectFramework", () => {
  it.each([
    ["react in dependencies", { dependencies: { react: "19" } }, "react"],
    ["vue in dependencies", { dependencies: { vue: "3" } }, "vue"],
    ["react in devDependencies", { devDependencies: { react: "19" } }, "react"],
  ])("finds %s", async (_label, pkg, expected) => {
    const cwd = await temp();
    await write(cwd, "package.json", JSON.stringify(pkg));
    expect(await detectFramework(cwd)).toBe(expected);
  });

  it("prefers vue when a project has both", async () => {
    const cwd = await temp();
    await write(cwd, "package.json", JSON.stringify({ dependencies: { react: "19", vue: "3" } }));
    expect(await detectFramework(cwd)).toBe("vue");
  });

  it("returns null when there is no package.json", async () => {
    expect(await detectFramework(await temp())).toBeNull();
  });

  it("returns null when package.json is malformed", async () => {
    const cwd = await temp();
    await write(cwd, "package.json", "{ not json");
    expect(await detectFramework(cwd)).toBeNull();
  });

  it("returns null when neither framework is present", async () => {
    const cwd = await temp();
    await write(cwd, "package.json", JSON.stringify({ dependencies: { svelte: "5" } }));
    expect(await detectFramework(cwd)).toBeNull();
  });
});

describe("detectCssEntry", () => {
  it("finds a stylesheet that imports tailwindcss", async () => {
    const cwd = await temp();
    await write(cwd, "src/index.css", '@import "tailwindcss";\n');
    expect(await detectCssEntry(cwd)).toBe("src/index.css");
  });

  it("accepts single quotes", async () => {
    const cwd = await temp();
    await write(cwd, "app/globals.css", "@import 'tailwindcss';\n");
    expect(await detectCssEntry(cwd)).toBe("app/globals.css");
  });

  it("ignores a stylesheet that does not import tailwindcss", async () => {
    const cwd = await temp();
    await write(cwd, "src/index.css", "body { margin: 0 }\n");
    expect(await detectCssEntry(cwd)).toBeNull();
  });

  it("returns null when nothing matches", async () => {
    expect(await detectCssEntry(await temp())).toBeNull();
  });
});

describe("detectPaths", () => {
  it("uses src when the project has one", async () => {
    const cwd = await temp();
    await mkdir(path.join(cwd, "src"));
    expect(detectPaths(cwd)).toEqual({ ui: "src/components/ui", lib: "src/lib" });
  });

  it("falls back to the project root", async () => {
    expect(detectPaths(await temp())).toEqual({ ui: "components/ui", lib: "lib" });
  });
});

describe("readConfig", () => {
  it("round trips what writeConfig produced", async () => {
    const cwd = await temp();
    const config = {
      framework: "vue" as const,
      css: "src/index.css",
      registry: DEFAULT_REGISTRY,
      paths: { ui: "src/components/ui", lib: "src/lib" },
      aliases: { ui: "@/components/ui", lib: "@/lib" },
    };
    await writeConfig(cwd, config);
    expect(await readConfig(cwd)).toEqual(config);
  });

  it("fills in the registry, paths and aliases when they are absent", async () => {
    const cwd = await temp();
    await write(cwd, CONFIG_FILE, JSON.stringify({ framework: "react", css: "src/index.css" }));
    const config = await readConfig(cwd);
    expect(config.registry).toBe(DEFAULT_REGISTRY);
    expect(config.aliases).toEqual({ ui: "@/components/ui", lib: "@/lib" });
  });

  it("explains that init has not run", async () => {
    await expect(readConfig(await temp())).rejects.toThrow(ConfigError);
  });

  it("rejects a malformed document", async () => {
    const cwd = await temp();
    await write(cwd, CONFIG_FILE, "{ not json");
    await expect(readConfig(cwd)).rejects.toThrow(/not valid JSON/);
  });

  it("rejects an unknown framework", async () => {
    const cwd = await temp();
    await write(cwd, CONFIG_FILE, JSON.stringify({ framework: "svelte", css: "a.css" }));
    await expect(readConfig(cwd)).rejects.toThrow(ValidationError);
  });
});
