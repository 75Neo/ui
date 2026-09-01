import type { ReactNode } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@75neo/react";
import { colors, sizes, variants } from "./button-matrix";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs text-dimmed">{label}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export default function ButtonPreview() {
  return (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <Row key={variant} label={variant}>
          {colors.map((color) => (
            <Button key={color} variant={variant} color={color}>
              {color}
            </Button>
          ))}
        </Row>
      ))}

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
        <Button leadingIcon={<Rocket />}>leading</Button>
        <Button trailingIcon={<ArrowRight />}>trailing</Button>
      </Row>
    </div>
  );
}
