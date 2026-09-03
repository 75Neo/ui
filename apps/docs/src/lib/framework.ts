/**
 * The two adapters, and everything that differs between them.
 *
 * @remarks
 * The docs split by framework rather than showing both at once. A reader has already
 * chosen React or Vue by the time they arrive, and a page that answers for both makes
 * them read past half of it. The prose is shared: only the install command, the
 * package name and the code examples change, so one Markdown file still serves both
 * routes.
 */

import { withBase } from "./href";

export const frameworks = ["react", "vue"] as const;

/** One of the two adapters. */
export type Framework = (typeof frameworks)[number];

interface FrameworkFacts {
  /** How the framework writes its own name. */
  label: string;
  /** The package to install. */
  package: string;
  /** The language a code fence uses for this framework's examples. */
  language: string;
  /** What the framework calls an icon, for the props tables. */
  icon: string;
  /** The lowest version the adapter supports. */
  requires: string;
}

export const frameworkFacts: Record<Framework, FrameworkFacts> = {
  react: {
    label: "React",
    package: "@75neo/react",
    language: "tsx",
    icon: "ReactNode",
    requires: "React 18 or newer",
  },
  vue: {
    label: "Vue",
    package: "@75neo/vue",
    language: "vue",
    icon: "Component",
    requires: "Vue 3.5 or newer",
  },
};

/** Whether a path segment names one of the adapters. */
export function isFramework(value: string | undefined): value is Framework {
  return frameworks.includes(value as Framework);
}

/** The URL of one documentation page for one framework. */
export function docHref(framework: Framework, page: "getting-started" | "components"): string {
  return withBase(`/docs/${framework}/${page}`);
}

/**
 * The same page in the other framework.
 *
 * @remarks
 * Every documentation route exists under both, so switching never lands on a 404 and
 * never drops the reader back at the top of the section.
 */
export function otherFramework(framework: Framework): Framework {
  return framework === "react" ? "vue" : "react";
}
