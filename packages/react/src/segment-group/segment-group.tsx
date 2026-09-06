import type React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cva } from "class-variance-authority";
import {
  cn,
  segmentGroupDefaults,
  segmentGroupOrientationData,
  segmentGroupSizeData,
  type SegmentGroupRootProps as SegmentGroupContract,
} from "@75neo/themes";
import { SegmentGroupVariantsContext } from "./variants";
import { SegmentGroupIndicator } from "./indicator";
import { SegmentGroupItem } from "./item";
import { SegmentGroupItemText } from "./item-text";

const segmentGroupRoot = cva(
  "relative isolate inline-flex rounded-md bg-elevated data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      size: segmentGroupSizeData.base,
      orientation: segmentGroupOrientationData.base,
    },
    defaultVariants: segmentGroupDefaults,
  },
);

/**
 * Props for the SegmentGroup.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes the choice, `onChange` because
 * Ark reports details rather than an event, and `dir` because direction belongs to
 * the locale provider.
 *
 * The selection comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface SegmentGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "onChange" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    SegmentGroupContract<React.ReactNode> {}

export function SegmentGroup({
  color,
  size,
  orientation,
  items,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: SegmentGroupProps) {
  const resolved = {
    color: color ?? segmentGroupDefaults.color,
    size: size ?? segmentGroupDefaults.size,
    orientation: orientation ?? segmentGroupDefaults.orientation,
  };

  return (
    <SegmentGroupVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="segment-group"
        data-color={resolved.color}
        data-size={resolved.size}
        data-orientation={resolved.orientation}
        className={cn(segmentGroupRoot(resolved), className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        orientation={resolved.orientation}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        ids={ids}
      >
        <SegmentGroupIndicator />
        {items.map((item) => (
          <SegmentGroupItem key={item.value} item={item}>
            <SegmentGroupItemText>{item.label}</SegmentGroupItemText>
          </SegmentGroupItem>
        ))}
      </Ark.Root>
    </SegmentGroupVariantsContext.Provider>
  );
}
