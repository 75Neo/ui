import type React from "react";
import { PinInput as Ark, type PinInputRootProps } from "@ark-ui/react/pin-input";
import {
  defaultPinInputLength,
  pinInput,
  type PinInputProps as PinInputContract,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the PinInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes one entry per box.
 *
 * The value props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface PinInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<PinInputRootProps, "value" | "defaultValue" | "onValueChange" | "onValueComplete" | "ids">,
    PinInputContract {}

export function PinInput({
  ui,
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
  const theme = useResolvedTheme(pinInput, "pinInput", { ui, color, size }, className);

  /*
   * The count reaches Ark so its own ARIA can say which box is which, and the same
   * number draws the boxes here. Ark has no part that renders them for us: each one
   * takes the index it sits at.
   */
  const count = length ?? defaultPinInputLength;

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      count={count}
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
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Control data-slot="control" className={theme.class.control}>
        {Array.from({ length: count }, (_, index) => (
          <Ark.Input key={index} index={index} data-slot="input" className={theme.class.input} />
        ))}
      </Ark.Control>

      {/* The one part with no slot of its own: it is hidden by contract, so a class on
          it would style nothing. It is what puts the joined code into a form. */}
      <Ark.HiddenInput />
    </Ark.Root>
  );
}
