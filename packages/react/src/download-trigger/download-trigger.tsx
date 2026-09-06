import type React from "react";
import { DownloadTrigger as Ark } from "@ark-ui/react/download-trigger";
import { cva } from "class-variance-authority";
import {
  cn,
  downloadTriggerBaseCompoundData,
  downloadTriggerDefaults,
  downloadTriggerSizeData,
  type DownloadTriggerProps as DownloadTriggerContract,
} from "@75neo/themes";

const downloadTriggerBase = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", ghost: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: downloadTriggerSizeData.base,
    },
    compoundVariants: downloadTriggerBaseCompoundData,
    defaultVariants: downloadTriggerDefaults,
  },
);

/**
 * Props for the DownloadTrigger.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 */
export interface DownloadTriggerProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    DownloadTriggerContract<React.ReactNode> {}

export function DownloadTrigger({
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
  return (
    <Ark
      {...rest}
      type={type}
      data-slot="download-trigger"
      data-variant={variant ?? downloadTriggerDefaults.variant}
      data-color={color ?? downloadTriggerDefaults.color}
      data-size={size ?? downloadTriggerDefaults.size}
      className={cn(downloadTriggerBase({ variant, size, color }), className)}
      // The contract spells blobs structurally because `@75neo/themes` typechecks
      // without the DOM library; a real `Blob` or `File` satisfies both spellings.
      data={data as React.ComponentProps<typeof Ark>["data"]}
      fileName={fileName}
      mimeType={mimeType}
      disabled={disabled}
    >
      {leadingIcon != null && (
        <span
          data-slot="download-trigger-leading-icon"
          className={cn(
            "shrink-0 [&>svg]:size-full",
            downloadTriggerSizeData.leadingIcon[size ?? downloadTriggerDefaults.size],
          )}
        >
          {leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="download-trigger-label" className={cn("truncate")}>
          {children}
        </span>
      )}
      {trailingIcon != null && (
        <span
          data-slot="download-trigger-trailing-icon"
          className={cn(
            "shrink-0 [&>svg]:size-full",
            downloadTriggerSizeData.trailingIcon[size ?? downloadTriggerDefaults.size],
          )}
        >
          {trailingIcon}
        </span>
      )}
    </Ark>
  );
}
