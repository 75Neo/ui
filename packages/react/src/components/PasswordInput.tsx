import type React from "react";
import { PasswordInput as Ark, type PasswordInputRootProps } from "@ark-ui/react/password-input";
import { Eye, EyeOff } from "lucide-react";
import { passwordInput, type PasswordInputProps as PasswordInputContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the PasswordInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name.
 *
 * There is no value prop, because Ark's root takes none: the field is uncontrolled
 * and submits under `name`. The visibility state comes from Ark, because React and
 * Vue spell a controlled value too differently to share one type.
 */
export interface PasswordInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<PasswordInputRootProps, "visible" | "defaultVisible" | "onVisibilityChange" | "ids">,
    PasswordInputContract<React.ReactNode> {}

export function PasswordInput({
  ui,
  color,
  size,
  label,
  placeholder,
  autoComplete,
  name,
  ignorePasswordManagers,
  disabled,
  readOnly,
  invalid,
  required,
  leadingIcon,
  visibleIcon,
  hiddenIcon,
  visible,
  defaultVisible,
  onVisibilityChange,
  ids,
  className,
  ...rest
}: PasswordInputProps) {
  const theme = useResolvedTheme(passwordInput, "passwordInput", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      autoComplete={autoComplete}
      name={name}
      ignorePasswordManagers={ignorePasswordManagers}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      required={required}
      visible={visible}
      defaultVisible={defaultVisible}
      onVisibilityChange={onVisibilityChange}
      ids={ids}
    >
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Control data-slot="control" className={theme.class.control}>
        {leadingIcon != null && (
          <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
            {leadingIcon}
          </span>
        )}

        <Ark.Input data-slot="input" className={theme.class.input} placeholder={placeholder} />

        <Ark.VisibilityTrigger
          data-slot="visibilityTrigger"
          className={theme.class.visibilityTrigger}
        >
          {/* Ark shows the children while the secret is visible and the fallback
              while it is hidden, so the adapter never reads the state itself. */}
          <Ark.Indicator
            data-slot="indicator"
            className={theme.class.indicator}
            fallback={hiddenIcon ?? <EyeOff />}
          >
            {visibleIcon ?? <Eye />}
          </Ark.Indicator>
        </Ark.VisibilityTrigger>
      </Ark.Control>
    </Ark.Root>
  );
}
