import type React from "react";
import { cva } from "class-variance-authority";
import { cn, radioGroupDefaults, radioGroupSizeData } from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemDescription = cva("mt-1 text-pretty text-muted", {
  variants: { size: radioGroupSizeData.description },
  defaultVariants: radioGroupDefaults,
});

export interface RadioGroupItemDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function RadioGroupItemDescription({
  className,
  children,
  ...rest
}: RadioGroupItemDescriptionProps) {
  const variants = useRadioGroupVariants();

  return (
    <p
      {...rest}
      data-slot="radio-group-item-description"
      className={cn(radioGroupItemDescription(variants), className)}
    >
      {children}
    </p>
  );
}
