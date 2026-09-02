import type React from "react";
import { Checkbox as Ark, type CheckboxRootProps } from "@ark-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import { type CheckboxProps as CheckboxContract, checkbox } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Checkbox.
 *
 * @remarks
 * The root is a `label`, so the HTML attributes are the label's. Three are dropped:
 * `color` and `defaultChecked` would collide with the variant and with Ark's own
 * prop, and `form` is owned by the shared contract so both adapters spell it once.
 *
 * The checked state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type. It is `boolean | "indeterminate"` in both.
 */
export interface CheckboxProps
  extends
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color" | "defaultChecked" | "form">,
    Pick<CheckboxRootProps, "checked" | "defaultChecked" | "onCheckedChange" | "ids">,
    CheckboxContract<React.ReactNode> {}

export function Checkbox({
  ui,
  color,
  size,
  label,
  description,
  icon,
  indeterminateIcon,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  value,
  form,
  checked,
  defaultChecked,
  onCheckedChange,
  ids,
  className,
  ...rest
}: CheckboxProps) {
  const theme = useResolvedTheme(checkbox, "checkbox", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      required={required}
      name={name}
      value={value}
      form={form}
      ids={ids}
    >
      {/* A box of the label's own line height, so the control aligns with the first
          line rather than with the top of a two-line block. */}
      <span data-slot="container" className={theme.class.container}>
        <Ark.Control data-slot="control" className={theme.class.control}>
          <Ark.Indicator data-slot="indicator" className={theme.class.indicator}>
            {icon ?? <Check />}
          </Ark.Indicator>
          <Ark.Indicator indeterminate data-slot="indicator" className={theme.class.indicator}>
            {indeterminateIcon ?? <Minus />}
          </Ark.Indicator>
        </Ark.Control>
      </span>

      {(label != null || description != null) && (
        <span data-slot="wrapper" className={theme.class.wrapper}>
          {label != null && (
            <Ark.Label data-slot="label" className={theme.class.label}>
              {label}
            </Ark.Label>
          )}
          {description != null && (
            <span data-slot="description" className={theme.class.description}>
              {description}
            </span>
          )}
        </span>
      )}

      <Ark.HiddenInput />
    </Ark.Root>
  );
}
