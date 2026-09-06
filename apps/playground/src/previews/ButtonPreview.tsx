import type { ReactNode } from "react";
import { Button } from "@75neo/react/button";
import { buttonSchema } from "@75neo/themes";
import { Star } from "lucide-react";

const variants = buttonSchema.variant.values;
const colors = buttonSchema.color.values;
const sizes = buttonSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
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
            <Button variant={variant}>Save</Button>
            <Button variant={variant} leadingIcon={<Star />}>
              Starred
            </Button>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Button key={color} color={color}>
              {color}
            </Button>
          ))}
        </Row>

        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Button size={size}>Save</Button>
            <Button size={size} leadingIcon={<Star />}>
              Starred
            </Button>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="block">
          <Button block>Full width</Button>
        </Row>

        <Row label="square">
          <Button square leadingIcon={<Star />} aria-label="Star" />
        </Row>

        <Row label="loading">
          <Button loading>Save</Button>
          <Button loading trailing trailingIcon={<Star />}>
            Save
          </Button>
        </Row>

        <Row label="disabled">
          <Button disabled>Save</Button>
        </Row>

        <Row label="override">
          <Button className="px-8">Call-site padding wins</Button>
        </Row>
      </div>
    </div>
  );
}
