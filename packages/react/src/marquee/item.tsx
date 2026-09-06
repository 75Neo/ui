import type React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cva } from "class-variance-authority";
import { cn, marqueeDefaults, marqueeSizeData } from "@75neo/themes";
import { useMarqueeVariants } from "./variants";

const marqueeItem = cva(
  "flex shrink-0 items-center gap-2 rounded-md bg-muted text-toned ring ring-accented select-none ring-inset",
  {
    variants: { size: marqueeSizeData.item },
    defaultVariants: marqueeDefaults,
  },
);

export interface MarqueeItemProps extends React.ComponentProps<typeof Ark.Item> {}

export function MarqueeItem({ className, children, ...rest }: MarqueeItemProps) {
  const variants = useMarqueeVariants();

  return (
    <Ark.Item {...rest} data-slot="marquee-item" className={cn(marqueeItem(variants), className)}>
      {children}
    </Ark.Item>
  );
}
