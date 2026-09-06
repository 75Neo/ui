import type React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cva } from "class-variance-authority";
import { cn, radioGroupDefaults, radioGroupSizeData } from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemText = cva("block font-medium text-highlighted select-none", {
  variants: { size: radioGroupSizeData.label },
  defaultVariants: radioGroupDefaults,
});

export interface RadioGroupItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function RadioGroupItemText({ className, children, ...rest }: RadioGroupItemTextProps) {
  const variants = useRadioGroupVariants();

  return (
    <Ark.ItemText
      {...rest}
      data-slot="radio-group-item-text"
      className={cn(radioGroupItemText(variants), className)}
    >
      {children}
    </Ark.ItemText>
  );
}
