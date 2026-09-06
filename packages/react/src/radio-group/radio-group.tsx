import type React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import {
  cn,
  radioGroupDefaults,
  type RadioGroupRootProps as RadioGroupContract,
} from "@75neo/themes";
import { RadioGroupVariantsContext } from "./variants";
import { RadioGroupItem } from "./item";
import { RadioGroupLegend } from "./legend";

/**
 * Props for the RadioGroup.
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
export interface RadioGroupProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "onChange" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    RadioGroupContract {}

export function RadioGroup({
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
  const resolved = {
    color: color ?? radioGroupDefaults.color,
    size: size ?? radioGroupDefaults.size,
  };

  return (
    <RadioGroupVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="radio-group"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn(
          "group/radio flex min-w-0 flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:items-start",
          className,
        )}
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
        {legend != null && <RadioGroupLegend>{legend}</RadioGroupLegend>}
        {items.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Ark.Root>
    </RadioGroupVariantsContext.Provider>
  );
}
