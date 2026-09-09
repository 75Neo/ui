import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { InstallError, destinationFor, rewriteImports, writeFiles } from "../src/install.js";
import type { Config, RegistryItem } from "../src/schema.js";

const config: Config = {
  framework: "react",
  css: "src/styles/global.css",
  registry: "https://75neo-ui.pages.dev/r",
  paths: { ui: "src/components/ui", lib: "src/lib" },
  aliases: { ui: "@/components/ui", lib: "@/lib" },
};

const temp = () => mkdtemp(path.join(tmpdir(), "75neoui-install-"));

describe("destinationFor", () => {
  it.each([
    ["registry/react/ui/dialog/Dialog.tsx", "src/components/ui/dialog/Dialog.tsx"],
    ["registry/vue/ui/dialog/Dialog.vue", "src/components/ui/dialog/Dialog.vue"],
    ["registry/shared/lib/dialog.styles.ts", "src/lib/dialog.styles.ts"],
  ])("maps %s", (from, to) => {
    expect(destinationFor({ path: from }, config)).toBe(to);
  });

  it("honours configured paths", () => {
    const flat: Config = { ...config, paths: { ui: "components", lib: "utils" } };
    expect(destinationFor({ path: "registry/react/ui/button/Button.tsx" }, flat)).toBe(
      "components/button/Button.tsx",
    );
  });

  it("refuses a path outside the registry layout", () => {
    expect(() => destinationFor({ path: "elsewhere/Button.tsx" }, config)).toThrow(InstallError);
  });
});

describe("rewriteImports", () => {
  it("rewrites the shared lib prefix", () => {
    expect(rewriteImports('import { x } from "@/registry/shared/lib/button.styles";', config)).toBe(
      'import { x } from "@/lib/button.styles";',
    );
  });

  it.each(["react", "vue"])("rewrites the %s ui prefix", (framework) => {
    expect(rewriteImports(`from "@/registry/${framework}/ui/dialog/Dialog"`, config)).toBe(
      'from "@/components/ui/dialog/Dialog"',
    );
  });

  it("rewrites every occurrence in a file", () => {
    const source = [
      'import a from "@/registry/shared/lib/a";',
      'import b from "@/registry/shared/lib/b";',
    ].join("\n");
    expect(rewriteImports(source, config)).not.toContain("@/registry");
  });

  it("leaves unrelated imports alone", () => {
    const source = 'import { cn } from "cn";\nimport React from "react";';
    expect(rewriteImports(source, config)).toBe(source);
  });
});

describe("writeFiles", () => {
  const item: RegistryItem = {
    name: "button",
    type: "registry:ui",
    files: [
      {
        path: "registry/react/ui/button/Button.tsx",
        type: "registry:ui",
        content: 'import { button } from "@/registry/shared/lib/button.styles";\n',
      },
      {
        path: "registry/shared/lib/button.styles.ts",
        type: "registry:lib",
        content: "export {};\n",
      },
    ],
  };

  it("writes files under the configured paths and rewrites imports", async () => {
    const cwd = await temp();
    const { written, skipped } = await writeFiles([item], config, { cwd, overwrite: false });

    expect(written).toEqual(["src/components/ui/button/Button.tsx", "src/lib/button.styles.ts"]);
    expect(skipped).toEqual([]);
    expect(await readFile(path.join(cwd, written[0] ?? ""), "utf8")).toContain(
      '"@/lib/button.styles"',
    );
  });

  it("skips existing files unless overwrite is set", async () => {
    const cwd = await temp();
    await mkdir(path.join(cwd, "src/lib"), { recursive: true });
    await writeFile(path.join(cwd, "src/lib/button.styles.ts"), "mine\n");

    const first = await writeFiles([item], config, { cwd, overwrite: false });
    expect(first.skipped).toEqual(["src/lib/button.styles.ts"]);
    expect(await readFile(path.join(cwd, "src/lib/button.styles.ts"), "utf8")).toBe("mine\n");

    const second = await writeFiles([item], config, { cwd, overwrite: true });
    expect(second.skipped).toEqual([]);
    expect(await readFile(path.join(cwd, "src/lib/button.styles.ts"), "utf8")).toBe("export {};\n");
  });

  it("handles an item that ships no files", async () => {
    const cwd = await temp();
    const theme: RegistryItem = { name: "theme", type: "registry:theme" };
    expect(await writeFiles([theme], config, { cwd, overwrite: false })).toEqual({
      written: [],
      skipped: [],
    });
  });
});
