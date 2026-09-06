import type { ReactNode } from "react";
import { ScrollArea } from "@75neo/react/scroll-area";
import { scrollAreaSchema } from "@75neo/themes";

const sizes = scrollAreaSchema.size.values;
const lines = Array.from({ length: 14 }, (_, index) => `Line ${index + 1}`);

const frame = "h-32 w-full rounded-lg ring ring-default ring-inset";
const body = "flex flex-col gap-2 p-3 text-sm text-toned";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

export default function ScrollAreaPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <ScrollArea size={size} className={frame}>
              <div className={body}>
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </ScrollArea>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="horizontal">
          <ScrollArea orientation="horizontal" className={frame}>
            <div className="flex w-max gap-2 p-3 text-sm text-toned">
              {lines.map((line) => (
                <p key={line} className="shrink-0">
                  {line}
                </p>
              ))}
            </div>
          </ScrollArea>
        </Row>

        <Row label="both">
          <ScrollArea orientation="both" className={frame}>
            <div className="flex w-max flex-col gap-2 p-3 text-sm text-toned">
              {lines.map((line) => (
                <p key={line} className="whitespace-nowrap">
                  {line} — and a good deal more text than fits across
                </p>
              ))}
            </div>
          </ScrollArea>
        </Row>
      </div>
    </div>
  );
}
