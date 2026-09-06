import type React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import {
  cn,
  defaultPinInputLength,
  pinInputDefaults,
  type PinInputRootProps as PinInputContract,
} from "@75neo/themes";
import { PinInputVariantsContext } from "./variants";
import { PinInputControl } from "./control";
import { PinInputInput } from "./input";
import { PinInputLabel } from "./label";

/**
 * Props for the PinInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes an array of them.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface PinInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onValueComplete" | "ids"
    >,
    PinInputContract {}

export function PinInput({
  color,
  size,
  length,
  label,
  placeholder,
  type,
  otp,
  mask,
  autoFocus,
  blurOnComplete,
  selectOnFocus,
  pattern,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  onValueComplete,
  ids,
  className,
  ...rest
}: PinInputProps) {
  const resolved = {
    color: color ?? pinInputDefaults.color,
    size: size ?? pinInputDefaults.size,
  };
  const count = length ?? defaultPinInputLength;

  return (
    <PinInputVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="pin-input"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex flex-col gap-1.5", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueComplete={onValueComplete}
        placeholder={placeholder}
        type={type}
        otp={otp}
        mask={mask}
        autoFocus={autoFocus}
        blurOnComplete={blurOnComplete}
        selectOnFocus={selectOnFocus}
        pattern={pattern}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        ids={ids}
      >
        {label != null && <PinInputLabel>{label}</PinInputLabel>}
        <PinInputControl>
          {Array.from({ length: count }, (_, index) => (
            <PinInputInput key={index} index={index} />
          ))}
        </PinInputControl>
        <Ark.HiddenInput />
      </Ark.Root>
    </PinInputVariantsContext.Provider>
  );
}
