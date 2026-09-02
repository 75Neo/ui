import { useRef } from "react";
import { TableOfContents } from "@75neo/react";

/**
 * The specimen watches its own scroller rather than the page, so it does not compete
 * with the rail this page already has, and the ids are prefixed because the page holds
 * both.
 */
const items = [
  { value: "specimen-react-install", depth: 2, label: "Install" },
  { value: "specimen-react-manager", depth: 3, label: "Package manager" },
  { value: "specimen-react-theme", depth: 2, label: "Import the theme" },
  { value: "specimen-react-cascade", depth: 2, label: "The cascade" },
  { value: "specimen-react-tokens", depth: 3, label: "Tokens" },
];

export function TableOfContentsPreview() {
  const scroller = useRef<HTMLDivElement | null>(null);

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_11rem]">
      <div
        ref={scroller}
        className="h-56 min-w-0 overflow-y-auto rounded-lg border border-muted p-4"
      >
        {items.map((item) => (
          <section key={item.value} className="mb-6 last:mb-0">
            <h2 id={item.value} className="text-sm font-semibold text-highlighted">
              {item.label}
            </h2>
            <div className="mt-2 flex flex-col gap-1.5">
              {Array.from({ length: 6 }).map((_, line) => (
                <div key={line} className="h-2 rounded-full bg-elevated" />
              ))}
            </div>
          </section>
        ))}
      </div>

      <TableOfContents items={items} scrollEl={() => scroller.current} />
    </div>
  );
}
