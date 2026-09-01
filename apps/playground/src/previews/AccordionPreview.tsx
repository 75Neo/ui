import type { ReactNode } from "react";
import { accordion, variantValues } from "@75neo/themes";
import { Accordion } from "@75neo/react";

const variants = variantValues(accordion, "variant");
const sizes = variantValues(accordion, "size");

const items = [
  { value: "cascade", label: "What settles a class?", content: "Four layers, weakest first." },
  { value: "slots", label: "Why one word per slot?", content: "Recipe, data-slot and ui key." },
  {
    value: "tokens",
    label: "Where does dark mode live?",
    content: "In the tokens, not the classes.",
  },
];

/*
 * Both adapters render this scaffold, so the two stages line up row for row and
 * any divergence between React and Vue shows as a break in the rhythm rather
 * than as something you have to hunt for.
 */
const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0";
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

export default function AccordionPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <Accordion items={items} variant={variant} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Accordion items={items} size={size} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="multiple">
          <Accordion items={items} multiple />
        </Row>

        <Row label="collapsible">
          <Accordion items={items} collapsible />
        </Row>

        <Row label="disabled">
          <Accordion items={items} disabled />
        </Row>

        <Row label="item off">
          <Accordion
            items={items.map((item, i) => (i === 1 ? { ...item, disabled: true } : item))}
          />
        </Row>

        <Row label="render">
          <Accordion
            items={items}
            renderContent={(item) => (
              <code className="font-mono text-xs text-toned" data-identifier>
                {item.value}
              </code>
            )}
          />
        </Row>

        <Row label="horizontal">
          <div className="h-44">
            <Accordion items={items} orientation="horizontal" />
          </div>
        </Row>
      </div>
    </div>
  );
}
