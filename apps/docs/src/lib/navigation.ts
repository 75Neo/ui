import type { MarkdownHeading } from "astro";
import type { Framework } from "./framework";
import type { ComponentApi } from "./component-api";
import type { DocumentedComponent } from "./components";
import { componentHref } from "./components";

/**
 * One entry in the rail of headings.
 *
 * @remarks
 * Temporary home: this shape lived in `@75neo/themes` beside the old
 * `TableOfContents` component. The batch migration restores that component first —
 * the docs chrome renders it — and this type goes home with it.
 */
export interface TableOfContentsItem {
  value: string;
  depth: number;
  label: string;
}

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
  const sections: TableOfContentsItem[] = [{ value: "parts", depth: 2, label: "Parts" }];

  if (api.variants.length > 0) {
    sections.push({ value: "variants", depth: 2, label: "Variants" });
  }

  for (const part of api.parts) {
    const own =
      (part.shared.length > 0 ? 1 : 0) +
      (framework === "react"
        ? part.react.props.length + part.react.inherits.length
        : part.vue.props.length + part.vue.slots.length + part.vue.models.length);

    if (own > 0) {
      sections.push({ value: `part-${part.name}`, depth: 2, label: part.name });
    }
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
