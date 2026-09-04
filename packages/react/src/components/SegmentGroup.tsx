import type React from "react";
import { SegmentGroup as Ark, type SegmentGroupRootProps } from "@ark-ui/react/segment-group";
import { segmentGroup, type SegmentGroupProps as SegmentGroupContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the SegmentGroup.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name, and `defaultValue` because
 * the attribute admits a string where Ark's root also takes `null`.
 *
 * The choice props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface SegmentGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<SegmentGroupRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    SegmentGroupContract<React.ReactNode> {}

export function SegmentGroup({
  ui,
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
  const theme = useResolvedTheme(
    segmentGroup,
    "segmentGroup",
    { ui, color, size, orientation },
    className,
  );

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      required={required}
      name={name}
      ids={ids}
    >
      {/* Behind the options rather than over them, so their text stays readable and
          the pill slides under it. */}
      <Ark.Indicator data-slot="indicator" className={theme.class.indicator} />

      {items.map((item) => (
        <Ark.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          data-slot="item"
          className={theme.class.item}
        >
          <Ark.ItemText data-slot="itemText" className={theme.class.itemText}>
            {item.label}
          </Ark.ItemText>
          <Ark.ItemControl />
          <Ark.ItemHiddenInput />
        </Ark.Item>
      ))}
    </Ark.Root>
  );
}
