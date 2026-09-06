import type React from "react";
import { ToggleGroup as Ark } from "@ark-ui/react/toggle-group";
import { cva } from "class-variance-authority";
import {
  cn,
  toggleGroupDefaults,
  toggleGroupItemCompoundData,
  toggleGroupSizeData,
  type ToggleGroupItemProps as ToggleGroupItemContract,
} from "@75neo/themes";
import { useToggleGroupVariants } from "./variants";
import { ToggleGroupItemText } from "./item-text";

const toggleGroupItem = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", subtle: "", ghost: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: toggleGroupSizeData.item,
    },
    compoundVariants: toggleGroupItemCompoundData,
    defaultVariants: toggleGroupDefaults,
  },
);

export interface ToggleGroupItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "value" | "children">,
    ToggleGroupItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function ToggleGroupItem({
  item,
  leadingIcon,
  className,
  children,
  ...rest
}: ToggleGroupItemProps) {
  const variants = useToggleGroupVariants();
  const glyph = leadingIcon ?? item.icon;

  return (
    <Ark.Item
      {...rest}
      value={item.value}
      disabled={item.disabled}
      data-slot="toggle-group-item"
      className={cn(toggleGroupItem(variants), className)}
    >
      {glyph != null && (
        <span
          data-slot="toggle-group-leading-icon"
          className={cn(
            "shrink-0 [&>svg]:size-full",
            toggleGroupSizeData.leadingIcon[variants.size],
          )}
        >
          {glyph}
        </span>
      )}
      {children ?? <ToggleGroupItemText>{item.label}</ToggleGroupItemText>}
    </Ark.Item>
  );
}
