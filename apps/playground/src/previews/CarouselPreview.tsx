import type { ReactNode } from "react";
import { Carousel } from "@75neo/react/carousel";
import { carouselSchema } from "@75neo/themes";

const sizes = carouselSchema.size.values;

const items = [
  { id: "one", content: "Slide one" },
  { id: "two", content: "Slide two" },
  { id: "three", content: "Slide three" },
];

const stage =
  "[&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-28 [&_[data-slot=carousel-item]]:place-items-center";

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

export default function CarouselPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Carousel size={size} items={items} className={stage} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="loop">
          <Carousel items={items} loop className={stage} />
        </Row>

        <Row label="two up">
          <Carousel items={items} slidesPerPage={2} spacing="0.5rem" className={stage} />
        </Row>

        <Row label="vertical">
          <Carousel items={items} orientation="vertical" className={`h-40 ${stage}`} />
        </Row>
      </div>
    </div>
  );
}
