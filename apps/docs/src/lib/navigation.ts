import type { TableOfContentsItem } from "@75neo/themes";
import type { MarkdownHeading } from "astro";
import type { Framework } from "./framework";
import type { ComponentApi } from "./component-api";
import type { DocumentedComponent } from "./components";
import { componentHref } from "./components";

/** One link in the sidebar. */
export interface SidebarLink {
  href: string;
  label: string;
}

/** The components section of the sidebar, for one framework. */
export function componentLinks(
  framework: Framework,
  components: DocumentedComponent[],
): SidebarLink[] {
  return components.map(({ entry, slug }) => ({
    href: componentHref(framework, slug),
    label: entry.data.name,
  }));
}

/**
 * The rail entries for the generated half of a component page. These headings are
 * rendered by `ComponentApi.astro` rather than written in Markdown, so `render()` does
 * not hand them back. Which exist depends on the component and the framework.
 */
export function apiSections(api: ComponentApi, framework: Framework): TableOfContentsItem[] {
  const sections: TableOfContentsItem[] = [{ value: "slots", depth: 2, label: "Slots" }];

  if (api.variants.length > 0) {
    sections.push({ value: "variants", depth: 2, label: "Variants" });
  }

  sections.push({ value: "props", depth: 2, label: "Props" });

  const own =
    framework === "react"
      ? api.react.props.length + api.react.inherits.length
      : api.vue.props.length + api.vue.slots.length + api.vue.models.length;

  if (own > 0) {
    sections.push({
      value: "framework-props",
      depth: 2,
      label: `${framework === "react" ? "React" : "Vue"} only`,
    });
  }

  return sections;
}

/**
 * Turn Astro's rendered headings into rail entries. The slug Astro generates is the `id`
 * it put on the heading, which is what the rail resolves, so nothing re-slugs anything.
 *
 * @param headings - What `render()` returned for one Markdown entry.
 * @param maxDepth - The deepest level to list. Past `h3` a rail lists more than it helps.
 */
export function railItems(headings: MarkdownHeading[], maxDepth = 3): TableOfContentsItem[] {
  return headings
    .filter((heading) => heading.depth >= 2 && heading.depth <= maxDepth)
    .map((heading) => ({ value: heading.slug, depth: heading.depth, label: heading.text }));
}
