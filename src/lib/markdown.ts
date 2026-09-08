import { createMarkdownParser, type MarkdownDocument } from "comark";
import shiki from "comark/plugins/shiki";
import { generateFlatToc } from "comark/plugins/toc";
import githubDark from "@shikijs/themes/github-dark";
import githubLight from "@shikijs/themes/github-light";
import type { DocsHeading, Framework } from "@/lib/docs";

const TOC_OPTIONS = { title: "", depth: 2, searchDepth: 1, links: [] };

const parse = createMarkdownParser({
  plugins: [shiki({ themes: { light: githubLight, dark: githubDark } })],
});

export const parseDocument = (markdown: string) => parse(markdown);

export function documentHeadings(document: MarkdownDocument): DocsHeading[] {
  return generateFlatToc(document, TOC_OPTIONS).links.map((link) => ({
    slug: link.id,
    text: link.text,
    depth: link.depth,
  }));
}

const FRAMEWORK_LANGUAGES: Record<Framework, Set<string>> = {
  react: new Set(["tsx", "jsx"]),
  vue: new Set(["vue"]),
};

const isForeignCodeBlock = (node: unknown, foreign: Set<string>) =>
  Array.isArray(node) &&
  node[0] === "pre" &&
  typeof node[1] === "object" &&
  node[1] !== null &&
  foreign.has((node[1] as { language?: string }).language ?? "");

export function documentForFramework(
  document: MarkdownDocument,
  framework: Framework,
): MarkdownDocument {
  const foreign = framework === "react" ? FRAMEWORK_LANGUAGES.vue : FRAMEWORK_LANGUAGES.react;
  return {
    ...document,
    nodes: document.nodes.filter((node) => !isForeignCodeBlock(node, foreign)),
  };
}
