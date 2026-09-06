import type React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cva } from "class-variance-authority";
import {
  cn,
  radioGroupDefaults,
  radioGroupSizeData,
  type RadioGroupItemProps as RadioGroupItemContract,
} from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";
import { RadioGroupItemControl } from "./item-control";
import { RadioGroupItemDescription } from "./item-description";
import { RadioGroupItemIndicator } from "./item-indicator";
import { RadioGroupItemText } from "./item-text";

const radioGroupItem = cva(
  "flex min-w-0 cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: { size: radioGroupSizeData.item },
    defaultVariants: radioGroupDefaults,
  },
);

export interface RadioGroupItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "value" | "children">,
    RadioGroupItemContract {
  children?: React.ReactNode;
}

export function RadioGroupItem({ item, className, children, ...rest }: RadioGroupItemProps) {
  const variants = useRadioGroupVariants();

  return (
    <Ark.Item
      {...rest}
      value={item.value}
      disabled={item.disabled}
      data-slot="radio-group-item"
      className={cn(radioGroupItem(variants), className)}
    >
      {children ?? (
        <>
          <RadioGroupItemControl>
            <RadioGroupItemIndicator />
          </RadioGroupItemControl>
          <span data-slot="radio-group-item-wrapper" className={cn("min-w-0 flex-1")}>
            <RadioGroupItemText>{item.label}</RadioGroupItemText>
            {item.description != null && (
              <RadioGroupItemDescription>{item.description}</RadioGroupItemDescription>
            )}
          </span>
        </>
      )}
      <Ark.ItemHiddenInput />
    </Ark.Item>
  );
}
