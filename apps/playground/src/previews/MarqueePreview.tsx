import { marquee, variantValues, type MarqueeItem } from "@75neo/themes";
import { Marquee } from "@75neo/react";

const sizes = variantValues(marquee, "size");
const speeds = variantValues(marquee, "speed");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

function toItems(words: string[]): MarqueeItem[] {
  return words.map((word) => ({ id: word, content: word }));
}

const tickers = toItems(["75NeoUI", "React", "Vue", "Ark UI", "Tailwind", "tokens", "cascade"]);

export default function MarqueePreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Marquee size={size} items={tickers} />
        </div>
      ))}

      <hr className="border-muted" />

      {speeds.map((speed) => (
        <div key={speed} className={row}>
          <p className={rowLabel} data-identifier>
            {speed}
          </p>
          <Marquee speed={speed} items={tickers} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          edges
        </p>
        <Marquee edge pauseOnInteraction items={tickers} />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <div className="max-w-48">
          <Marquee side="bottom" items={tickers} />
        </div>
      </div>
    </div>
  );
}
