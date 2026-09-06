import type React from "react";
import {
  PasswordInput as Ark,
  type PasswordInputRootProps as ArkRootProps,
} from "@ark-ui/react/password-input";
import { Eye, EyeOff } from "lucide-react";
import {
  cn,
  passwordInputDefaults,
  passwordInputSizeData,
  type PasswordInputRootProps as PasswordInputContract,
} from "@75neo/themes";
import { PasswordInputVariantsContext } from "./variants";
import { PasswordInputControl } from "./control";
import { PasswordInputIndicator } from "./indicator";
import { PasswordInputInput } from "./input";
import { PasswordInputLabel } from "./label";
import { PasswordInputVisibilityTrigger } from "./visibility-trigger";

/**
 * Props for the PasswordInput.
 *
 * @remarks
 * There is no value prop, because Ark's root takes none: the field is uncontrolled
 * and both frameworks spell a controlled value too differently to share one type.
 */
export interface PasswordInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<ArkRootProps, "visible" | "defaultVisible" | "onVisibilityChange" | "ids">,
    PasswordInputContract<React.ReactNode> {}

export function PasswordInput({
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
  const resolved = {
    color: color ?? passwordInputDefaults.color,
    size: size ?? passwordInputDefaults.size,
  };

  return (
    <PasswordInputVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="password-input"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
        visible={visible}
        defaultVisible={defaultVisible}
        onVisibilityChange={onVisibilityChange}
        autoComplete={autoComplete}
        name={name}
        ignorePasswordManagers={ignorePasswordManagers}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        ids={ids}
      >
        {label != null && <PasswordInputLabel>{label}</PasswordInputLabel>}
        <PasswordInputControl>
          {leadingIcon != null && (
            <span
              data-slot="password-input-leading-icon"
              className={cn(
                "shrink-0 text-dimmed [&>svg]:size-full",
                passwordInputSizeData.leadingIcon[resolved.size],
              )}
            >
              {leadingIcon}
            </span>
          )}
          <PasswordInputInput placeholder={placeholder} />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator fallback={hiddenIcon ?? <EyeOff />}>
              {visibleIcon ?? <Eye />}
            </PasswordInputIndicator>
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </Ark.Root>
    </PasswordInputVariantsContext.Provider>
  );
}
