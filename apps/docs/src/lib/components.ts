import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { type ComponentApi, componentApi } from "./component-api";
import { type Framework, docHref } from "./framework";

/** A documented component: its prose entry, and the API read out of the source. */
export interface DocumentedComponent {
  entry: CollectionEntry<"components">;
  api: ComponentApi;
  /** The last path segment of the component's page, such as `"angle-slider"`. */
  slug: string;
}

/**
 * Every documented component, in the order the content files ask for.
 *
 * @remarks
 * The Markdown drives the list. Adding a component to the docs is adding one file, and
 * the API tables follow from the three coordinates in its frontmatter.
 */
export async function documentedComponents(): Promise<DocumentedComponent[]> {
  const entries = await getCollection("components");

  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      entry,
      slug: entry.id,
      api: componentApi({
        name: entry.data.name,
        key: entry.data.key,
        module: entry.data.module,
      }),
    }));
}

/**
 * The URL of one component's page.
 *
 * @remarks
 * The slug is the content file's own name, so `table-of-contents.md` answers at
 * `/docs/react/components/table-of-contents`. Nothing derives it from the exported
 * component name, which would have to guess where the words break.
 */
export function componentHref(framework: Framework, slug: string): string {
  return `${docHref(framework, "components")}/${slug}`;
}
