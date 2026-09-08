import { getCollection, getEntry } from "astro:content";

export const FRAMEWORKS = ["react", "vue"] as const;

export type Framework = (typeof FRAMEWORKS)[number];

export const DEFAULT_FRAMEWORK: Framework = "react";

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: "React",
  vue: "Vue",
};

export interface DocsLink {
  href: string;
  label: string;
  component?: string;
}

export interface DocsSection {
  label: string;
  links: DocsLink[];
}

export interface DocsHeading {
  slug: string;
  text: string;
  depth: number;
}

export const guideHref = (id: string) => `/docs/${id}`;

export const componentHref = (id: string, framework?: Framework | null) =>
  `/docs/components/${framework ?? DEFAULT_FRAMEWORK}/${id}`;

export async function docsNavigation(framework: Framework | null): Promise<DocsSection[]> {
  const guides = await getCollection("guides");
  const components = await getCollection("components");

  const categories = new Map<string, DocsLink[]>();
  for (const entry of components.sort((a, b) => a.data.title.localeCompare(b.data.title))) {
    const links = categories.get(entry.data.category) ?? [];
    links.push({
      href: componentHref(entry.id, framework),
      label: entry.data.title,
      component: entry.id,
    });
    categories.set(entry.data.category, links);
  }

  return [
    {
      label: "Getting started",
      links: guides
        .sort((a, b) => a.data.order - b.data.order)
        .map((entry) => ({ href: guideHref(entry.id), label: entry.data.title })),
    },
    ...[...categories]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, links]) => ({ label, links })),
  ];
}

export function flattenNavigation(sections: DocsSection[]) {
  return sections.flatMap((section) => section.links);
}

export function adjacentPages(sections: DocsSection[], href: string) {
  const links = flattenNavigation(sections);
  const index = links.findIndex((link) => link.href === href);

  return {
    previous: index > 0 ? links[index - 1] : undefined,
    next: index >= 0 && index < links.length - 1 ? links[index + 1] : undefined,
  };
}

export const apiHeadingSlug = (componentName: string) => `api-${componentName.toLowerCase()}`;

export async function apiHeadings(registryItem: string): Promise<DocsHeading[]> {
  const entry = await getEntry("componentApi", registryItem);
  if (!entry) return [];

  return [
    { slug: "api-reference", text: "API reference", depth: 2 },
    ...entry.data.components.map((component) => ({
      slug: apiHeadingSlug(component.name),
      text: component.name,
      depth: 3,
    })),
  ];
}
