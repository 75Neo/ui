import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { PACKAGE_MANAGERS, detectPackageManager, installArgs } from "../src/pm.js";

const roots: string[] = [];

async function project(lockfile?: string): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "75neoui-pm-"));
  roots.push(root);
  if (lockfile !== undefined) await writeFile(path.join(root, lockfile), "");
  return root;
}

afterEach(() => {
  roots.length = 0;
});

describe("detectPackageManager", () => {
  it.each([
    ["pnpm-lock.yaml", "pnpm"],
    ["bun.lock", "bun"],
    ["bun.lockb", "bun"],
    ["yarn.lock", "yarn"],
    ["package-lock.json", "npm"],
  ])("reads %s as %s", async (lockfile, expected) => {
    expect(detectPackageManager(await project(lockfile))).toBe(expected);
  });

  it("prefers pnpm when several lockfiles are present", async () => {
    const root = await project("package-lock.json");
    await writeFile(path.join(root, "pnpm-lock.yaml"), "");
    expect(detectPackageManager(root)).toBe("pnpm");
  });

  it("walks up to a parent workspace", async () => {
    const root = await project("pnpm-lock.yaml");
    const nested = path.join(root, "apps", "web");
    await mkdir(nested, { recursive: true });
    expect(detectPackageManager(nested)).toBe("pnpm");
  });

  it("falls back to npm when nothing is found up to the root", async () => {
    expect(detectPackageManager(await project())).toBe("npm");
  });

  it("only ever returns a known manager", async () => {
    expect(PACKAGE_MANAGERS).toContain(detectPackageManager(await project("yarn.lock")));
  });
});

describe("installArgs", () => {
  it.each([
    ["npm", ["install", "@75neo/ui"]],
    ["pnpm", ["add", "@75neo/ui"]],
    ["yarn", ["add", "@75neo/ui"]],
    ["bun", ["add", "@75neo/ui"]],
  ] as const)("builds the %s command", (manager, expected) => {
    expect(installArgs(["@75neo/ui"], manager)).toEqual(expected);
  });

  it.each([
    ["npm", ["install", "-D", "@75neo/ui"]],
    ["pnpm", ["add", "-D", "@75neo/ui"]],
    ["yarn", ["add", "-D", "@75neo/ui"]],
    ["bun", ["add", "-D", "@75neo/ui"]],
  ] as const)("adds the dev flag for %s", (manager, expected) => {
    expect(installArgs(["@75neo/ui"], manager, true)).toEqual(expected);
  });

  it("keeps several packages in order", () => {
    expect(installArgs(["cn", "tailwind-variants"], "pnpm")).toEqual([
      "add",
      "cn",
      "tailwind-variants",
    ]);
  });
});
