import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeViewport,
} from "@/components/react";

const items = ["Ark UI", "Tailwind v4", "tailwind-variants", "shadcn registry", "Astro", "Comark"];

export default function MarqueeOverview() {
  return (
    <Marquee speed={30} pauseOnInteraction>
      <MarqueeViewport>
        <MarqueeContent>
          {items.map((item) => (
            <MarqueeItem key={item}>
              <span className="font-mono text-sm text-muted">{item}</span>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="start" />
      <MarqueeEdge side="end" />
    </Marquee>
  );
}
