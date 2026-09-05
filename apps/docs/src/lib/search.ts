import { type Framework, docHref } from "./framework";
import type { DocumentedComponent } from "./components";
import { componentHref } from "./components";

/** One row in the search dialog. */
export interface SearchEntry {
  href: string;
  label: string;
  /** The heading the row is filed under, and the second thing the query matches. */
  group: string;
  /** One line under the label, so a row that is not the obvious match explains itself. */
  summary: string;
}

/**
 * Everything the search dialog can reach, for one framework. Built at page render and
 * inlined as JSON, from the same list the sidebar is built from, so the dialog needs no
 * fetch and a reader searching from the Vue route lands on Vue pages.
 */
export function searchIndex(
  framework: Framework,
  components: DocumentedComponent[],
): SearchEntry[] {
  return [
    {
      href: docHref(framework, "getting-started"),
      label: "Getting started",
      group: "Guides",
      summary: "Install the package, import the theme, and restyle a component.",
    },
    {
      href: docHref(framework, "components"),
      label: "Components",
      group: "Guides",
      summary: "Every documented component, with a live specimen on each card.",
    },
    ...components.map(({ entry, slug }) => ({
      href: componentHref(framework, slug),
      label: entry.data.name,
      group: "Components",
      summary: entry.data.summary,
    })),
  ];
}
