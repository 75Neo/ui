import type { ReactNode } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { button, variantValues } from "@75neo/themes";
import { Button } from "@75neo/react";

const variants = variantValues(button, "variant");
const sizes = variantValues(button, "size");
const colors = variantValues(button, "color");

/*
 * Both adapters render this scaffold, so the two stages line up row for row and
 * any divergence between React and Vue shows as a break in the rhythm rather
 * than as something you have to hunt for.
 */
const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const rowItems = "flex flex-wrap items-center gap-2";
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

export default function ButtonPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            {colors.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="size">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </Row>

        <Row label="state">
          <Button>default</Button>
          <Button disabled>disabled</Button>
          <Button loading>loading</Button>
          <Button leadingIcon={<Plus />}>leading</Button>
          <Button trailingIcon={<ArrowRight />}>trailing</Button>
        </Row>
      </div>
    </div>
  );
}
