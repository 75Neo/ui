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
 * Every documented component, in alphabetical order.
 *
 * @remarks
 * The Markdown drives the list: adding a component is adding one file, and the API
 * tables follow from the three coordinates in its frontmatter. The order is the name's
 * rather than a number per file, and the previous and next links walk the same list.
 */
export async function documentedComponents(): Promise<DocumentedComponent[]> {
  const entries = await getCollection("components");

  return entries
    .sort((a, b) => a.data.name.localeCompare(b.data.name))
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
 * The URL of one component's page. The slug is the content file's own name, so nothing
 * has to guess where the words break in an exported component name.
 */
export function componentHref(framework: Framework, slug: string): string {
  return `${docHref(framework, "components")}/${slug}`;
}
