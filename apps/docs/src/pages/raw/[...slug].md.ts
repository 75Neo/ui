import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

/**
 * Every documentation page, served as the Markdown it was written in.
 *
 * @remarks
 * The rendered page offers this address three ways: as a link, and as the thing the two
 * assistant links hand over. A model reading `/raw/components/button.md` gets the prose
 * and the examples with none of the chrome, from one file rather than a scrape.
 *
 * The route is framework-neutral, because the Markdown is: one file serves both
 * adapters and the fences for the other one travel with it.
 */
export async function getStaticPaths() {
  const guide = await getEntry("guides", "getting-started");
  const components = await getCollection("components");

  return [
    { params: { slug: "getting-started" }, props: { body: guide?.body ?? "" } },
    ...components.map((entry) => ({
      params: { slug: `components/${entry.id}` },
      props: { body: entry.body ?? "" },
    })),
  ];
}

export const GET: APIRoute<{ body: string }> = ({ props }) =>
  new Response(props.body, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
