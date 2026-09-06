import type { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
} from "@75neo/react/accordion";
import { accordionSchema } from "@75neo/themes";
import { Star } from "lucide-react";

const variants = accordionSchema.variant.values;
const sizes = accordionSchema.size.values;

const rows = [
  {
    value: "cascade",
    label: "What settles a class?",
    content: "One layer: the call-site className over the part classes.",
  },
  {
    value: "slots",
    label: "Why one word per slot?",
    content: "The export, the file and the data-slot share it.",
  },
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

function Rows() {
  return rows.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionItemTrigger>{item.label}</AccordionItemTrigger>
      <AccordionItemContent>{item.content}</AccordionItemContent>
    </AccordionItem>
  ));
}

export default function AccordionPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <Accordion variant={variant}>
              <Rows />
            </Accordion>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Accordion size={size}>
              <Rows />
            </Accordion>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="multiple">
          <Accordion multiple>
            <Rows />
          </Accordion>
        </Row>

        <Row label="collapsible">
          <Accordion collapsible>
            <Rows />
          </Accordion>
        </Row>

        <Row label="disabled">
          <Accordion disabled>
            <Rows />
          </Accordion>
        </Row>

        <Row label="item off">
          <Accordion>
            {rows.map((item, i) => (
              <AccordionItem key={item.value} value={item.value} disabled={i === 1}>
                <AccordionItemTrigger>{item.label}</AccordionItemTrigger>
                <AccordionItemContent>{item.content}</AccordionItemContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Row>

        <Row label="icons">
          <Accordion>
            <AccordionItem value="star">
              <AccordionItemTrigger leadingIcon={<Star />} trailingIcon={<Star />}>
                Both slots
              </AccordionItemTrigger>
              <AccordionItemContent>
                The trigger owns its indicator; both props are glyphs, not parts.
              </AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </Row>

        <Row label="horizontal">
          <div className="h-44">
            <Accordion orientation="horizontal">
              <Rows />
            </Accordion>
          </div>
        </Row>
      </div>
    </div>
  );
}
