import { createMarkdownParser, type MarkdownDocument } from "comark";
import shiki from "comark/plugins/shiki";
import { generateFlatToc } from "comark/plugins/toc";
import githubDark from "@shikijs/themes/github-dark";
import githubLight from "@shikijs/themes/github-light";
import type { DocsHeading } from "@/lib/docs";

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
