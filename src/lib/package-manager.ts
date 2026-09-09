export const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const DEFAULT_PACKAGE_MANAGER: PackageManager = "pnpm";

const RULES: { prefix: string; replacements: Record<PackageManager, string> }[] = [
  {
    prefix: "npm install ",
    replacements: { npm: "npm install ", pnpm: "pnpm add ", yarn: "yarn add ", bun: "bun add " },
  },
  {
    prefix: "npm run ",
    replacements: { npm: "npm run ", pnpm: "pnpm run ", yarn: "yarn ", bun: "bun run " },
  },
  {
    prefix: "npx ",
    replacements: { npm: "npx ", pnpm: "pnpm dlx ", yarn: "yarn dlx ", bun: "bunx " },
  },
];

export const isPackageCommand = (command: string) =>
  RULES.some((rule) => command.startsWith(rule.prefix));

export function packageCommands(command: string): Record<PackageManager, string> {
  const rule = RULES.find((candidate) => command.startsWith(candidate.prefix));
  if (!rule) {
    return { npm: command, pnpm: command, yarn: command, bun: command };
  }

  const rest = command.slice(rule.prefix.length);
  return {
    npm: rule.replacements.npm + rest,
    pnpm: rule.replacements.pnpm + rest,
    yarn: rule.replacements.yarn + rest,
    bun: rule.replacements.bun + rest,
  };
}
