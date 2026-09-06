import type React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import {
  cn,
  numberInputDefaults,
  type NumberInputRootProps as NumberInputContract,
} from "@75neo/themes";
import { NumberInputVariantsContext } from "./variants";
import { NumberInputControl } from "./control";
import { NumberInputDecrementTrigger } from "./decrement-trigger";
import { NumberInputIncrementTrigger } from "./increment-trigger";
import { NumberInputInput } from "./input";
import { NumberInputLabel } from "./label";

/**
 * Props for the NumberInput.
 *
 * @remarks
 * `color` and `inputMode` are dropped from the HTML attributes: the legacy
 * presentational attribute would collide with the variant of the same name, and the
 * attribute admits strings where Ark computes its own mode. `defaultValue` goes with
 * them, since the attribute admits a string where Ark's root takes a number, and
 * `dir` because direction belongs to the locale provider.
 *
 * The selection props come from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface NumberInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir" | "inputMode">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onValueCommit" | "ids"
    >,
    NumberInputContract<React.ReactNode> {}

export function NumberInput({
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
  decrementIcon,
  incrementIcon,
  disabled,
  readOnly,
  invalid,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  ids,
  className,
  ...rest
}: NumberInputProps) {
  const resolved = {
    color: color ?? numberInputDefaults.color,
    size: size ?? numberInputDefaults.size,
    orientation: orientation ?? numberInputDefaults.orientation,
  };
  // A row reads as a quantity picker and wants a minus and a plus; a column reads
  // as a spinner and wants two chevrons. Either icon prop replaces its default, so
  // a caller who wants one shape with the other's icons still gets it.
  const stacked = resolved.orientation === "vertical";

  return (
    <NumberInputVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="number-input"
        data-color={resolved.color}
        data-size={resolved.size}
        data-orientation={resolved.orientation}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
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
        clampValueOnBlur={clampValueOnBlur ?? true}
        allowOverflow={allowOverflow ?? false}
        spinOnPress={spinOnPress ?? true}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        ids={ids}
      >
        {label != null && <NumberInputLabel>{label}</NumberInputLabel>}
        <NumberInputControl>
          <NumberInputInput placeholder={placeholder} />
          <NumberInputDecrementTrigger>
            {decrementIcon ?? (stacked ? <ChevronDown /> : <Minus />)}
          </NumberInputDecrementTrigger>
          <NumberInputIncrementTrigger>
            {incrementIcon ?? (stacked ? <ChevronUp /> : <Plus />)}
          </NumberInputIncrementTrigger>
        </NumberInputControl>
      </Ark.Root>
    </NumberInputVariantsContext.Provider>
  );
}
