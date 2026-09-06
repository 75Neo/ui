import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cva } from "class-variance-authority";
import {
  cn,
  selectDefaults,
  selectItemCompoundData,
  selectSizeData,
  type SelectItemProps as SelectItemContract,
} from "@75neo/themes";
import { useSelectVariants } from "./variants";
import { SelectItemIndicator } from "./item-indicator";
import { SelectItemText } from "./item-text";

const selectItem = cva(
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
      size: selectSizeData.item,
    },
    compoundVariants: selectItemCompoundData,
    defaultVariants: selectDefaults,
  },
);

export interface SelectItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "item" | "children">,
    SelectItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function SelectItem({
  item,
  leadingIcon,
  selectedIcon,
  className,
  children,
  ...rest
}: SelectItemProps) {
  const variants = useSelectVariants();
  const glyph = leadingIcon ?? item.icon;

  return (
    <Ark.Item
      {...rest}
      item={item}
      data-slot="select-item"
      className={cn(selectItem(variants), className)}
    >
      {glyph != null && (
        <span
          data-slot="select-leading-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            selectSizeData.leadingIcon[variants.size],
          )}
        >
          {glyph}
        </span>
      )}
      {children ?? <SelectItemText>{item.label}</SelectItemText>}
      <SelectItemIndicator>{selectedIcon}</SelectItemIndicator>
    </Ark.Item>
  );
}
