import type React from "react";
import { ToggleGroup as Ark, type ToggleGroupRootProps } from "@ark-ui/react/toggle-group";
import { toggleGroup, type ToggleGroupProps as ToggleGroupContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the ToggleGroup.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` is dropped too,
 * because the attribute admits a string where Ark's root takes an array.
 *
 * The selection comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface ToggleGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<ToggleGroupRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    ToggleGroupContract<React.ReactNode> {}

export function ToggleGroup({
  ui,
  variant,
  size,
  color,
  orientation,
  items,
  multiple,
  deselectable,
  disabled,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: ToggleGroupProps) {
  const theme = useResolvedTheme(
    toggleGroup,
    "toggleGroup",
    { ui, variant, size, color, orientation },
    className,
  );

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      orientation={orientation}
      disabled={disabled}
      multiple={multiple}
      deselectable={deselectable}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      ids={ids}
    >
      {items.map((item) => (
        <Ark.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          data-slot="item"
          className={theme.class.item}
        >
          {item.icon != null && (
            <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
              {item.icon}
            </span>
          )}
          {item.label != null && (
            <span data-slot="itemText" className={theme.class.itemText}>
              {item.label}
            </span>
          )}
        </Ark.Item>
      ))}
    </Ark.Root>
  );
}
