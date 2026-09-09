import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const LOCKFILES: ReadonlyArray<readonly [string, PackageManager]> = [
  ["pnpm-lock.yaml", "pnpm"],
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["yarn.lock", "yarn"],
  ["package-lock.json", "npm"],
];

const ADD: Record<PackageManager, readonly string[]> = {
  npm: ["install"],
  pnpm: ["add"],
  yarn: ["add"],
  bun: ["add"],
};

export function detectPackageManager(cwd: string): PackageManager {
  let directory = path.resolve(cwd);

  for (;;) {
    for (const [lockfile, manager] of LOCKFILES) {
      if (existsSync(path.join(directory, lockfile))) return manager;
    }
    const parent = path.dirname(directory);
    if (parent === directory) return "npm";
    directory = parent;
  }
}

export interface InstallOptions {
  readonly cwd: string;
  readonly manager: PackageManager;
  readonly dev?: boolean;
}

export const installArgs = (
  packages: readonly string[],
  manager: PackageManager,
  dev = false,
): string[] => [...ADD[manager], ...(dev ? ["-D"] : []), ...packages];

export function install(packages: readonly string[], options: InstallOptions): Promise<void> {
  if (packages.length === 0) return Promise.resolve();

  const args = installArgs(packages, options.manager, options.dev ?? false);

  return new Promise((resolve, reject) => {
    const child = spawn(options.manager, args, {
      cwd: options.cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else
        reject(new Error(`${options.manager} ${args.join(" ")} exited with code ${String(code)}.`));
    });
  });
}
