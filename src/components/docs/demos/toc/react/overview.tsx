import { Toc, TocIndicator, TocItem, TocLink, TocList, TocTitle } from "@/components/react";

const headings = [
  { slug: "examples", text: "Examples", depth: 2 },
  { slug: "example-overview", text: "Overview", depth: 3 },
  { slug: "installation", text: "Installation", depth: 2 },
  { slug: "api-reference", text: "API reference", depth: 2 },
];

const items = headings.map((heading) => ({ value: heading.slug, depth: heading.depth }));

export default function TocOverview() {
  return (
    <div className="max-w-56">
      <Toc items={items} rootMargin="-80px 0px -55% 0px">
        <TocTitle className="text-xs text-dimmed">On this page</TocTitle>
        <TocList>
          <TocIndicator />
          {headings.map((heading) => (
            <TocItem key={heading.slug} item={{ value: heading.slug, depth: heading.depth }}>
              <TocLink href={`#${heading.slug}`}>{heading.text}</TocLink>
            </TocItem>
          ))}
        </TocList>
      </Toc>
    </div>
  );
}
