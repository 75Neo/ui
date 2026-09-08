import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { Framework } from "@/lib/docs";
import type { DemoExample } from "@/components/docs/demos/types";

type DemoModule = { default: unknown };

const manifests = import.meta.glob<{ default: DemoExample[] }>("./*/examples.ts", { eager: true });

const modules = import.meta.glob<DemoModule>(["./*/react/*.astro", "./*/vue/*.astro"], {
  eager: true,
});

const sources = import.meta.glob<string>(["./*/react/*.tsx", "./*/vue/*.vue"], {
  eager: true,
  query: "?raw",
  import: "default",
});

const componentFromManifestPath = (path: string) => path.slice(2, path.indexOf("/examples.ts"));

export const demoComponents = new Set(Object.keys(manifests).map(componentFromManifestPath));

export const hasDemos = (component: string) => demoComponents.has(component);

export const demoExamples = (component: string): DemoExample[] =>
  manifests[`./${component}/examples.ts`]?.default ?? [];

const wrapperPath = (component: string, framework: Framework, id: string) =>
  `./${component}/${framework}/${id}.astro`;

const sourcePath = (component: string, framework: Framework, id: string) =>
  framework === "react" ? `./${component}/react/${id}.tsx` : `./${component}/vue/${id}.vue`;

export const demoComponent = (component: string, framework: Framework, id: string) =>
  modules[wrapperPath(component, framework, id)]?.default as AstroComponentFactory | undefined;

export const demoSource = (component: string, framework: Framework, id: string) =>
  sources[sourcePath(component, framework, id)];

export const demoLanguage = (framework: Framework) => (framework === "react" ? "tsx" : "vue");

export const demoHeadingSlug = (id: string) => `example-${id}`;

export function demoHeadings(component: string) {
  return demoExamples(component).map((example) => ({
    slug: demoHeadingSlug(example.id),
    text: example.title,
    depth: 3,
  }));
}
