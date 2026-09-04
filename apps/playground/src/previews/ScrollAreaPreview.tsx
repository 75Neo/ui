import { scrollArea, variantValues } from "@75neo/themes";
import { ScrollArea } from "@75neo/react";

const sizes = variantValues(scrollArea, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

function Paragraphs({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <p key={index} className="mt-3 first:mt-0">
          Paragraph {index + 1}. The native scrollbar is hidden and the styled one shows while the
          pointer is over this region, while it holds focus, or while it scrolls.
        </p>
      ))}
    </>
  );
}

export default function ScrollAreaPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <ScrollArea size={size} className="h-48 rounded-lg ring ring-default ring-inset">
            <Paragraphs />
          </ScrollArea>
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          horizontal
        </p>
        <ScrollArea orientation="horizontal" className="rounded-lg ring ring-default ring-inset">
          <div className="flex gap-3 p-4">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-toned"
              >
                Card {index + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          both
        </p>
        <ScrollArea orientation="both" className="h-48 rounded-lg ring ring-default ring-inset">
          <div className="w-[50rem] p-4">
            <Paragraphs count={8} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
