import type React from "react";
import { Switch as Ark, type SwitchRootProps } from "@ark-ui/react/switch";
import { LoaderCircle } from "lucide-react";
import { type SwitchProps as SwitchContract, switch as switchRecipe } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Switch.
 *
 * @remarks
 * The root is a `label`, so the HTML attributes are the label's. Three are dropped:
 * `color` and `defaultChecked` would collide with the variant and with Ark's own prop,
 * and `form` is owned by the shared contract so both adapters spell it once.
 *
 * The checked state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface SwitchProps
  extends
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color" | "defaultChecked" | "form">,
    Pick<SwitchRootProps, "checked" | "defaultChecked" | "onCheckedChange" | "ids">,
    SwitchContract<React.ReactNode> {}

export function Switch({
  ui,
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
  const theme = useResolvedTheme(
    switchRecipe,
    "switch",
    { ui, color, size, loading: isLoading },
    className,
  );

  // The recipe spins whichever icon the thumb is showing, so the spinner only has to
  // be put in both slots and left there.
  const spinner = loadingIcon ?? <LoaderCircle />;
  const onIcon = isLoading ? spinner : checkedIcon;
  const offIcon = isLoading ? spinner : uncheckedIcon;

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
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
      aria-busy={isLoading || undefined}
    >
      {/* A box of the label's own line height, so the track aligns with the first line
          rather than with the top of a two-line block. */}
      <span data-slot="container" className={theme.class.container}>
        <Ark.Control data-slot="control" className={theme.class.control}>
          <Ark.Thumb data-slot="thumb" className={theme.class.thumb}>
            {onIcon != null && (
              <span data-slot="checkedIcon" className={theme.class.checkedIcon}>
                {onIcon}
              </span>
            )}
            {offIcon != null && (
              <span data-slot="uncheckedIcon" className={theme.class.uncheckedIcon}>
                {offIcon}
              </span>
            )}
          </Ark.Thumb>
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
