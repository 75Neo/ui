import type React from "react";
import { NumberInput as Ark, type NumberInputRootProps } from "@ark-ui/react/number-input";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { numberInput, type NumberInputProps as NumberInputContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the NumberInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits numbers where Ark's root takes the field's text, and
 * `inputMode` because React's is every keyboard a browser has where Ark's is the few
 * that make sense over digits.
 *
 * The value props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface NumberInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "inputMode">,
    Pick<
      NumberInputRootProps,
      "value" | "defaultValue" | "onValueChange" | "onValueCommit" | "ids"
    >,
    NumberInputContract<React.ReactNode> {}

export function NumberInput({
  ui,
  color,
  size,
  orientation,
  label,
  placeholder,
  min,
  max,
  step,
  largeStep,
  smallStep,
  formatOptions,
  locale,
  allowMouseWheel,
  clampValueOnBlur,
  allowOverflow,
  spinOnPress,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  incrementIcon,
  decrementIcon,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  ids,
  className,
  ...rest
}: NumberInputProps) {
  const theme = useResolvedTheme(
    numberInput,
    "numberInput",
    { ui, color, size, orientation },
    className,
  );

  /*
   * A row reads as a quantity picker and wants a minus and a plus; a column reads as a
   * spinner and wants two chevrons. Either icon prop replaces its default, so a caller
   * who wants one shape with the other's icons still gets it.
   */
  const stacked = (orientation ?? "horizontal") === "vertical";

  /*
   * These three are resolved here rather than left for Ark, because forwarding an
   * absent prop as `undefined` overwrites the machine's own default with nothing and
   * quietly turns the behaviour off. Writing them out also keeps the derived one
   * derived: clamping on blur is the opposite of allowing overflow unless a caller
   * says otherwise.
   */
  const overflows = allowOverflow ?? false;
  const clamps = clampValueOnBlur ?? !overflows;
  const spins = spinOnPress ?? true;

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      smallStep={smallStep}
      formatOptions={formatOptions}
      locale={locale}
      allowMouseWheel={allowMouseWheel}
      clampValueOnBlur={clamps}
      allowOverflow={overflows}
      spinOnPress={spins}
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
        {/* Written in reading order — the field, then down, then up — and placed by the
            recipe. The row moves them with `order` and the column by grid line, so the
            markup never has to know which arrangement it is in. */}
        <Ark.Input data-slot="input" className={theme.class.input} placeholder={placeholder} />
        <Ark.DecrementTrigger data-slot="decrementTrigger" className={theme.class.decrementTrigger}>
          {decrementIcon ?? (stacked ? <ChevronDown /> : <Minus />)}
        </Ark.DecrementTrigger>
        <Ark.IncrementTrigger data-slot="incrementTrigger" className={theme.class.incrementTrigger}>
          {incrementIcon ?? (stacked ? <ChevronUp /> : <Plus />)}
        </Ark.IncrementTrigger>
      </Ark.Control>
    </Ark.Root>
  );
}
