import type React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { LoaderCircle } from "lucide-react";
import { cn, switchDefaults, type SwitchRootProps as SwitchContract } from "@75neo/themes";
import { SwitchVariantsContext } from "./variants";
import { SwitchControl } from "./control";
import { SwitchDescription } from "./description";
import { SwitchLabel } from "./label";
import { SwitchThumb } from "./thumb";

/**
 * Props for the Switch.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultChecked` goes with it,
 * since the attribute is a string where Ark's root takes a boolean.
 *
 * The checked state comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface SwitchProps
  extends
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color" | "defaultChecked">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "checked" | "defaultChecked" | "onCheckedChange" | "ids"
    >,
    SwitchContract<React.ReactNode> {}

export function Switch({
  color,
  size,
  label,
  description,
  checkedIcon,
  uncheckedIcon,
  loading,
  loadingIcon,
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
}: SwitchProps) {
  const isLoading = Boolean(loading);
  const resolved = {
    color: color ?? switchDefaults.color,
    size: size ?? switchDefaults.size,
    loading: isLoading,
  };
  const spinner = loadingIcon ?? <LoaderCircle />;

  return (
    <SwitchVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="switch"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn(
          "inline-flex cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
          className,
        )}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={Boolean(disabled) || isLoading}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        value={value}
        form={form}
        ids={ids}
      >
        {/* The recipe spins whichever icon the thumb is showing, so the spinner only
            has to be placed in the same one. */}
        <SwitchControl>
          <SwitchThumb
            checkedIcon={isLoading ? spinner : checkedIcon}
            uncheckedIcon={isLoading ? spinner : uncheckedIcon}
          />
        </SwitchControl>
        {(label != null || description != null) && (
          <span data-slot="switch-wrapper" className={cn("min-w-0 flex-1")}>
            {label != null && <SwitchLabel>{label}</SwitchLabel>}
            {description != null && <SwitchDescription>{description}</SwitchDescription>}
          </span>
        )}
      </Ark.Root>
    </SwitchVariantsContext.Provider>
  );
}
