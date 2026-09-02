import { useRef } from "react";
import { TableOfContents } from "@75neo/react";

/**
 * Ids are global to the page, and this playground renders the same specimen twice, so
 * every id here is prefixed. The rail tracks headings inside its own scroller rather
 * than the page, which is what `scrollEl` is for.
 */
const sections = [
  { value: "react-install", depth: 2, label: "Install" },
  { value: "react-package-manager", depth: 3, label: "Package manager" },
  { value: "react-peer-deps", depth: 3, label: "Peer dependencies" },
  { value: "react-theme", depth: 2, label: "Import the theme" },
  { value: "react-cascade", depth: 2, label: "The cascade" },
  { value: "react-tokens", depth: 3, label: "Tokens" },
  { value: "react-layers", depth: 3, label: "Theme layers" },
  { value: "react-types", depth: 2, label: "Type safety" },
];

export default function TableOfContentsPreview() {
  const scroller = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_11rem]">
      <div
        ref={scroller}
        className="h-64 min-w-0 overflow-y-auto rounded-lg border border-muted p-4"
      >
        {sections.map((section) => (
          <section key={section.value} className="mb-6 last:mb-0">
            <h2
              id={section.value}
              className="text-sm font-semibold text-highlighted"
              data-depth={section.depth}
            >
              {section.label}
            </h2>
            <div className="mt-2 flex flex-col gap-1.5">
              {Array.from({ length: 6 }).map((_, line) => (
                <div key={line} className="h-2 rounded-full bg-elevated" />
              ))}
            </div>
          </section>
        ))}
      </div>

      <TableOfContents items={sections} scrollEl={() => scroller.current} />
    </div>
  );
}
