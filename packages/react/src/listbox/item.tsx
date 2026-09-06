import type React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cva } from "class-variance-authority";
import {
  cn,
  listboxDefaults,
  listboxItemCompoundData,
  listboxSizeData,
  type ListboxItemProps as ListboxItemContract,
} from "@75neo/themes";
import { useListboxVariants } from "./variants";
import { ListboxItemIndicator } from "./item-indicator";
import { ListboxItemText } from "./item-text";

const listboxItem = cva(
  "flex cursor-pointer items-center rounded-md text-toned outline-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
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
      size: listboxSizeData.item,
    },
    compoundVariants: listboxItemCompoundData,
    defaultVariants: listboxDefaults,
  },
);

export interface ListboxItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "item" | "children">,
    ListboxItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function ListboxItem({
  item,
  leadingIcon,
  selectedIcon,
  className,
  children,
  ...rest
}: ListboxItemProps) {
  const variants = useListboxVariants();
  const glyph = leadingIcon ?? item.icon;

  return (
    <Ark.Item
      {...rest}
      item={item}
      data-slot="listbox-item"
      className={cn(listboxItem(variants), className)}
    >
      {glyph != null && (
        <span
          data-slot="listbox-leading-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            listboxSizeData.leadingIcon[variants.size],
          )}
        >
          {glyph}
        </span>
      )}
      {children ?? <ListboxItemText>{item.label}</ListboxItemText>}
      <ListboxItemIndicator>{selectedIcon}</ListboxItemIndicator>
    </Ark.Item>
  );
}
