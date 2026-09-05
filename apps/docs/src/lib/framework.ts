/**
 * The two adapters, and everything that differs between them. The docs split by
 * framework rather than answering for both at once; the prose is still one Markdown
 * file, because only the package name and the code examples change.
 */

export const frameworks = ["react", "vue"] as const;

/** One of the two adapters. */
export type Framework = (typeof frameworks)[number];

interface FrameworkFacts {
  /** How the framework writes its own name. */
  label: string;
  /** The package to install. */
  package: string;
  /** The language a code fence uses, narrowed because the landing page hands it Shiki. */
  language: "tsx" | "vue";
  /** What the framework calls an icon, for the props tables. */
  icon: string;
  /** The lowest version the adapter supports. */
  requires: string;
  /** The framework's own mark, as a Simple Icons slug. */
  brand: string;
}

export const frameworkFacts: Record<Framework, FrameworkFacts> = {
  react: {
    label: "React",
    package: "@75neo/react",
    language: "tsx",
    icon: "ReactNode",
    requires: "React 18 or newer",
    brand: "react",
  },
  vue: {
    label: "Vue",
    package: "@75neo/vue",
    language: "vue",
    icon: "Component",
    requires: "Vue 3.5 or newer",
    brand: "vuedotjs",
  },
};

/** Whether a path segment names one of the adapters. */
export function isFramework(value: string | undefined): value is Framework {
  return frameworks.includes(value as Framework);
}

/** The URL of one documentation page for one framework. */
export function docHref(framework: Framework, page: "getting-started" | "components"): string {
  return `/docs/${framework}/${page}`;
}

/** The same page in the other framework. Every route exists under both. */
export function otherFramework(framework: Framework): Framework {
  return framework === "react" ? "vue" : "react";
}
