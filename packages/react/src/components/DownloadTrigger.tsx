import type React from "react";
import { DownloadTrigger as Ark } from "@ark-ui/react/download-trigger";
import {
  type DownloadTriggerProps as DownloadTriggerContract,
  downloadTrigger,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the DownloadTrigger.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 *
 * `children` is the button's label, which usually names the file being saved. See the
 * note on `DownloadTriggerProps` in `@75neo/themes` for why it is children rather than
 * a string prop.
 */
export interface DownloadTriggerProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    DownloadTriggerContract<React.ReactNode> {}

export function DownloadTrigger({
  ui,
  variant,
  color,
  size,
  data,
  fileName,
  mimeType,
  leadingIcon,
  trailingIcon,
  disabled,
  className,
  children,
  type = "button",
  ...rest
}: DownloadTriggerProps) {
  const theme = useResolvedTheme(
    downloadTrigger,
    "downloadTrigger",
    { ui, variant, color, size },
    className,
  );

  return (
    <Ark
      {...rest}
      type={type}
      data-slot="base"
      className={theme.class.base}
      // The contract spells blobs structurally because `@75neo/themes` typechecks
      // without the DOM library; a real `Blob` or `File` satisfies both spellings.
      data={data as React.ComponentProps<typeof Ark>["data"]}
      fileName={fileName}
      mimeType={mimeType}
      disabled={disabled}
    >
      {leadingIcon != null && (
        <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
          {leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={theme.class.label}>
          {children}
        </span>
      )}
      {trailingIcon != null && (
        <span data-slot="trailingIcon" className={theme.class.trailingIcon}>
          {trailingIcon}
        </span>
      )}
    </Ark>
  );
}
