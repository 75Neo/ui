import type React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cva } from "class-variance-authority";
import {
  cn,
  segmentGroupDefaults,
  segmentGroupItemCompoundData,
  segmentGroupOrientationData,
  segmentGroupSizeData,
  type SegmentGroupItemProps as SegmentGroupItemContract,
} from "@75neo/themes";
import { useSegmentGroupVariants } from "./variants";
import { SegmentGroupItemText } from "./item-text";

const segmentGroupItem = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap text-toned transition-colors outline-none select-none hover:text-highlighted data-disabled:cursor-not-allowed data-disabled:opacity-75",
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
      size: segmentGroupSizeData.item,
      orientation: segmentGroupOrientationData.item,
    },
    compoundVariants: segmentGroupItemCompoundData,
    defaultVariants: segmentGroupDefaults,
  },
);

export interface SegmentGroupItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "value" | "children">,
    SegmentGroupItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function SegmentGroupItem({
  item,
  leadingIcon,
  className,
  children,
  ...rest
}: SegmentGroupItemProps) {
  const variants = useSegmentGroupVariants();
  const glyph = leadingIcon ?? item.icon;

  return (
    <Ark.Item
      {...rest}
      value={item.value}
      disabled={item.disabled}
      data-slot="segment-group-item"
      className={cn(segmentGroupItem(variants), className)}
    >
      {glyph != null && (
        <span data-slot="segment-group-leading-icon" className={cn("shrink-0 [&>svg]:size-[1em]")}>
          {glyph}
        </span>
      )}
      {children ?? <SegmentGroupItemText>{item.label}</SegmentGroupItemText>}
      <Ark.ItemControl />
      <Ark.ItemHiddenInput />
    </Ark.Item>
  );
}
