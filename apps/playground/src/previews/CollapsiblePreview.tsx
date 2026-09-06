import type { ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@75neo/react/collapsible";
import { collapsibleSchema } from "@75neo/themes";

const variants = collapsibleSchema.variant.values;
const sizes = collapsibleSchema.size.values;

const body =
  "A named value for a design decision, so the decision is made once and spent everywhere.";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-sm";
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

export default function CollapsiblePreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <Collapsible variant={variant} defaultOpen>
              <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
              <CollapsibleContent>{body}</CollapsibleContent>
            </Collapsible>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Collapsible size={size} defaultOpen>
              <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
              <CollapsibleContent>{body}</CollapsibleContent>
            </Collapsible>
          </Row>
        ))}

        <Row label="disabled">
          <Collapsible disabled>
            <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
            <CollapsibleContent>{body}</CollapsibleContent>
          </Collapsible>
        </Row>

        <Row label="show more">
          <Collapsible collapsedHeight={40}>
            <CollapsibleTrigger>Read the whole answer</CollapsibleTrigger>
            <CollapsibleContent>{body}</CollapsibleContent>
          </Collapsible>
        </Row>
      </div>
    </div>
  );
}
