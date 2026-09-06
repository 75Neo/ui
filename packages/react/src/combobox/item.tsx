import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import {
  cn,
  comboboxDefaults,
  comboboxItemCompoundData,
  comboboxSizeData,
  type ComboboxItemProps as ComboboxItemContract,
} from "@75neo/themes";
import { useComboboxVariants } from "./variants";
import { ComboboxItemIndicator } from "./item-indicator";
import { ComboboxItemText } from "./item-text";

const comboboxItem = cva(
  "flex cursor-pointer items-center rounded-md text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: comboboxSizeData.item,
    },
    compoundVariants: comboboxItemCompoundData,
    defaultVariants: comboboxDefaults,
  },
);

export interface ComboboxItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "item" | "children">,
    ComboboxItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function ComboboxItem({
  item,
  leadingIcon,
  selectedIcon,
  className,
  children,
  ...rest
}: ComboboxItemProps) {
  const variants = useComboboxVariants();
  const glyph = leadingIcon ?? item.icon;

  return (
    <Ark.Item
      {...rest}
      item={item}
      data-slot="combobox-item"
      className={cn(comboboxItem(variants), className)}
    >
      {glyph != null && (
        <span
          data-slot="combobox-leading-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            comboboxSizeData.leadingIcon[variants.size],
          )}
        >
          {glyph}
        </span>
      )}
      {children ?? <ComboboxItemText>{item.label}</ComboboxItemText>}
      <ComboboxItemIndicator>{selectedIcon}</ComboboxItemIndicator>
    </Ark.Item>
  );
}
