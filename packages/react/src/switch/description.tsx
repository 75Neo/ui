import type React from "react";
import { cva } from "class-variance-authority";
import { cn, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchDescription = cva("mt-1 text-pretty text-muted", {
  variants: { size: switchSizeData.description },
  defaultVariants: switchDefaults,
});

export interface SwitchDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SwitchDescription({ className, children, ...rest }: SwitchDescriptionProps) {
  const variants = useSwitchVariants();

  return (
    <p
      {...rest}
      data-slot="switch-description"
      className={cn(switchDescription(variants), className)}
    >
      {children}
    </p>
  );
}
