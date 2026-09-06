import type { ReactNode } from "react";
import { Marquee } from "@75neo/react/marquee";
import { marqueeSchema } from "@75neo/themes";

const sizes = marqueeSchema.size.values;
const speeds = marqueeSchema.speed.values;

const items = [
  { id: "react", content: "React" },
  { id: "vue", content: "Vue" },
  { id: "svelte", content: "Svelte" },
  { id: "solid", content: "Solid" },
  { id: "angular", content: "Angular" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
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

export default function MarqueePreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Marquee size={size} items={items} autoFill />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {speeds.map((speed) => (
          <Row key={speed} label={speed}>
            <Marquee speed={speed} items={items} autoFill />
          </Row>
        ))}

        <Row label="edge">
          <Marquee items={items} autoFill edge />
        </Row>

        <Row label="reverse">
          <Marquee items={items} autoFill reverse />
        </Row>

        <Row label="pause">
          <Marquee items={items} autoFill pauseOnInteraction />
        </Row>
      </div>
    </div>
  );
}
