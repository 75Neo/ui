import type React from "react";
import { ToggleGroup as Ark } from "@ark-ui/react/toggle-group";
import {
  cn,
  toggleGroupDefaults,
  type ToggleGroupRootProps as ToggleGroupContract,
} from "@75neo/themes";
import { ToggleGroupVariantsContext } from "./variants";
import { ToggleGroupItem } from "./item";

/**
 * Props for the ToggleGroup.
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
export interface ToggleGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "onChange" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    ToggleGroupContract<React.ReactNode> {}

export function ToggleGroup({
  variant,
  color,
  size,
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
  const resolved = {
    variant: variant ?? toggleGroupDefaults.variant,
    color: color ?? toggleGroupDefaults.color,
    size: size ?? toggleGroupDefaults.size,
    orientation: orientation ?? toggleGroupDefaults.orientation,
  };

  return (
    <ToggleGroupVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="toggle-group"
        data-variant={resolved.variant}
        data-color={resolved.color}
        data-size={resolved.size}
        data-orientation={resolved.orientation}
        className={cn(
          "inline-flex gap-1 data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[orientation=vertical]:flex-col",
          className,
        )}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        multiple={multiple}
        deselectable={deselectable}
        disabled={disabled}
        ids={ids}
      >
        {items.map((item) => (
          <ToggleGroupItem key={item.value} item={item} />
        ))}
      </Ark.Root>
    </ToggleGroupVariantsContext.Provider>
  );
}
