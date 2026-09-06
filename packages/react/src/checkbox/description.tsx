import type React from "react";
import { cva } from "class-variance-authority";
import { cn, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxDescription = cva("mt-1 text-pretty text-muted", {
  variants: { size: checkboxSizeData.description },
  defaultVariants: checkboxDefaults,
});

export interface CheckboxDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CheckboxDescription({ className, children, ...rest }: CheckboxDescriptionProps) {
  const variants = useCheckboxVariants();

  return (
    <p
      {...rest}
      data-slot="checkbox-description"
      className={cn(checkboxDescription(variants), className)}
    >
      {children}
    </p>
  );
}
