import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  RegistryError,
  collectDependencies,
  fetchIndex,
  fetchItem,
  resolveItems,
  stripNamespace,
} from "../src/registry.js";
import { ValidationError } from "../src/schema.js";

const file = (name: string) => ({
  path: `registry/react/ui/${name}/${name}.tsx`,
  type: "registry:ui",
  content: "export default null;\n",
});

const ITEMS: Record<string, unknown> = {
  theme: { name: "theme", type: "registry:theme", css: { ":root": { "--ui-radius": "0.25rem" } } },
  button: {
    name: "button",
    type: "registry:ui",
    dependencies: ["cn", "tailwind-variants"],
    registryDependencies: ["@75neo/theme"],
    files: [file("button")],
  },
  dialog: {
    name: "dialog",
    type: "registry:ui",
    dependencies: ["cn", "@ark-ui/react"],
    registryDependencies: ["@75neo/theme"],
    files: [file("dialog")],
  },
};

async function registry(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "75neoui-registry-"));
  const directory = path.join(root, "react");
  await mkdir(directory, { recursive: true });

  for (const [name, item] of Object.entries(ITEMS)) {
    await writeFile(path.join(directory, `${name}.json`), JSON.stringify(item));
  }
  await writeFile(
    path.join(directory, "registry.json"),
    JSON.stringify({
      name: "75neo",
      items: Object.values(ITEMS).map((item) => {
        const { name, type } = item as { name: string; type: string };
        return { name, type };
      }),
    }),
  );
  return root;
}

describe("stripNamespace", () => {
  it.each([
    ["@75neo/button", "button"],
    ["button", "button"],
  ])("turns %s into %s", (from, to) => {
    expect(stripNamespace(from)).toBe(to);
  });
});

describe("fetchItem", () => {
  it("reads and validates a local item", async () => {
    const item = await fetchItem(await registry(), "react", "@75neo/button");
    expect(item.name).toBe("button");
  });

  it("reports a missing item", async () => {
    await expect(fetchItem(await registry(), "react", "nope")).rejects.toThrow(RegistryError);
  });

  it("rejects an item that does not match the schema", async () => {
    const root = await registry();
    await writeFile(path.join(root, "react", "broken.json"), JSON.stringify({ name: "broken" }));
    await expect(fetchItem(root, "react", "broken")).rejects.toThrow(ValidationError);
  });

  it("reports a document that is not JSON", async () => {
    const root = await registry();
    await writeFile(path.join(root, "react", "bad.json"), "{ not json");
    await expect(fetchItem(root, "react", "bad")).rejects.toThrow(/not valid JSON/);
  });
});

describe("fetchIndex", () => {
  it("reads the index", async () => {
    const index = await fetchIndex(await registry(), "react");
    expect(index.items.map((item) => item.name)).toContain("dialog");
  });
});

describe("resolveItems", () => {
  it("follows registry dependencies transitively", async () => {
    const items = await resolveItems(await registry(), "react", ["button"]);
    expect(items.map((item) => item.name).sort()).toEqual(["button", "theme"]);
  });

  it("resolves each item once when two components share a dependency", async () => {
    const items = await resolveItems(await registry(), "react", ["button", "dialog"]);
    const names = items.map((item) => item.name);
    expect(names.filter((name) => name === "theme")).toHaveLength(1);
  });

  it("ignores a name repeated in the request", async () => {
    const items = await resolveItems(await registry(), "react", ["button", "@75neo/button"]);
    expect(items).toHaveLength(2);
  });

  it("names the item it could not resolve", async () => {
    await expect(resolveItems(await registry(), "react", ["nope"])).rejects.toThrow(
      /Could not resolve "nope"/,
    );
  });

  it("returns nothing for an empty request", async () => {
    expect(await resolveItems(await registry(), "react", [])).toEqual([]);
  });
});

describe("collectDependencies", () => {
  it("merges, deduplicates and sorts npm dependencies", async () => {
    const items = await resolveItems(await registry(), "react", ["button", "dialog"]);
    expect(collectDependencies(items)).toEqual(["@ark-ui/react", "cn", "tailwind-variants"]);
  });

  it("returns nothing when no item declares a dependency", () => {
    expect(collectDependencies([{ name: "theme", type: "registry:theme" }])).toEqual([]);
  });
});
