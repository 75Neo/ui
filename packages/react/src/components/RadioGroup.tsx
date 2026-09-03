import type React from "react";
import { RadioGroup as Ark, type RadioGroupRootProps } from "@ark-ui/react/radio-group";
import { type RadioGroupProps as RadioGroupContract, radioGroup } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the RadioGroup.
 *
 * @remarks
 * Three HTML attributes are dropped: `color`, where the legacy presentational attribute
 * would collide with the variant, and `defaultValue` and `onChange`, so Ark's own can
 * take the names.
 */
export interface RadioGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "onChange" | "dir">,
    Pick<RadioGroupRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    RadioGroupContract {}

export function RadioGroup({
  ui,
  color,
  size,
  items,
  legend,
  orientation,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  form,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: RadioGroupProps) {
  const theme = useResolvedTheme(radioGroup, "radioGroup", { ui, color, size }, className);

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
      form={form}
      ids={ids}
    >
      {legend != null && (
        <Ark.Label data-slot="legend" className={theme.class.legend}>
          {legend}
        </Ark.Label>
      )}

      {items.map((item) => (
        <Ark.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          data-slot="item"
          className={theme.class.item}
        >
          {/* A box of the label's own line height, so the control aligns with the first
              line rather than with the top of a two-line block. */}
          <span data-slot="container" className={theme.class.container}>
            <Ark.ItemControl data-slot="control" className={theme.class.control}>
              <span data-slot="indicator" className={theme.class.indicator} />
            </Ark.ItemControl>
          </span>

          <span data-slot="wrapper" className={theme.class.wrapper}>
            <Ark.ItemText data-slot="label" className={theme.class.label}>
              {item.label}
            </Ark.ItemText>
            {item.description != null && (
              <span data-slot="description" className={theme.class.description}>
                {item.description}
              </span>
            )}
          </span>

          <Ark.ItemHiddenInput />
        </Ark.Item>
      ))}
    </Ark.Root>
  );
}
