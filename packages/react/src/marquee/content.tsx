import type React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cva } from "class-variance-authority";
import { cn, marqueeDefaults, marqueeSideData, marqueeSpeedData } from "@75neo/themes";
import { useMarqueeVariants } from "./variants";

const marqueeContent = cva(
  "items-center [animation-delay:var(--marquee-delay)] [animation-iteration-count:var(--marquee-loop-count)] [animation-timing-function:linear] data-reverse:[animation-direction:reverse] motion-reduce:animate-none",
  {
    variants: {
      side: marqueeSideData.content,
      speed: marqueeSpeedData.content,
    },
    defaultVariants: marqueeDefaults,
  },
);

export interface MarqueeContentProps extends React.ComponentProps<typeof Ark.Content> {}

export function MarqueeContent({ className, children, ...rest }: MarqueeContentProps) {
  const variants = useMarqueeVariants();

  return (
    <Ark.Content
      {...rest}
      data-slot="marquee-content"
      className={cn(marqueeContent(variants), className)}
    >
      {children}
    </Ark.Content>
  );
}
