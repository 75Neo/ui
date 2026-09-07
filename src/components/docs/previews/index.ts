import type { AstroComponentFactory } from "astro/runtime/server/index.js";

const modules = import.meta.glob<{ default: AstroComponentFactory }>("./*.astro", { eager: true });

const idFromPath = (path: string) => path.replace("./", "").replace(".astro", "");

export const previewIds = new Set(Object.keys(modules).map(idFromPath));

export const hasPreview = (id: string) => previewIds.has(id);

export const previewComponent = (id: string) => modules[`./${id}.astro`]?.default;
