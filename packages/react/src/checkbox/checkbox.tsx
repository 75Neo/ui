import type React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import {
  cn,
  checkboxDefaults,
  checkboxSizeData,
  type CheckboxRootProps as CheckboxContract,
} from "@75neo/themes";
import { CheckboxVariantsContext } from "./variants";
import { CheckboxControl } from "./control";
import { CheckboxDescription } from "./description";
import { CheckboxIndicator } from "./indicator";
import { CheckboxLabel } from "./label";

/**
 * Props for the Checkbox.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultChecked` goes with it,
 * since the attribute is a string where Ark's root takes a boolean, and `form`
 * because direction belongs to the form element it already sits in.
 *
 * The checked state comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type. It is `boolean | "indeterminate"` in both.
 */
export interface CheckboxProps
  extends
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color" | "defaultChecked" | "form">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "checked" | "defaultChecked" | "onCheckedChange" | "ids"
    >,
    CheckboxContract<React.ReactNode> {}

export function Checkbox({
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
  const resolved = {
    color: color ?? checkboxDefaults.color,
    size: size ?? checkboxDefaults.size,
  };

  return (
    <CheckboxVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="checkbox"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn(
          "group/checkbox inline-flex cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
          className,
        )}
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
        <span
          data-slot="checkbox-container"
          className={cn("flex shrink-0 items-center", checkboxSizeData.container[resolved.size])}
        >
          <CheckboxControl>
            <CheckboxIndicator>{icon ?? <Check />}</CheckboxIndicator>
            <CheckboxIndicator indeterminate>{indeterminateIcon ?? <Minus />}</CheckboxIndicator>
          </CheckboxControl>
        </span>
        {(label != null || description != null) && (
          <span data-slot="checkbox-wrapper" className={cn("min-w-0 flex-1")}>
            {label != null && <CheckboxLabel>{label}</CheckboxLabel>}
            {description != null && <CheckboxDescription>{description}</CheckboxDescription>}
          </span>
        )}
        <Ark.HiddenInput />
      </Ark.Root>
    </CheckboxVariantsContext.Provider>
  );
}
