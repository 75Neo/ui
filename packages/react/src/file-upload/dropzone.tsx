import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { UploadCloud } from "lucide-react";
import {
  cn,
  fileUploadDefaults,
  fileUploadDropzoneCompoundData,
  fileUploadSizeData,
  type FileUploadDropzoneProps as FileUploadDropzoneContract,
} from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadDropzone = cva(
  "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-accented bg-default text-center transition-colors outline-none hover:bg-elevated/50 data-disabled:cursor-not-allowed data-disabled:opacity-75 hover:data-disabled:bg-default data-invalid:border-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: fileUploadSizeData.dropzone,
    },
    compoundVariants: fileUploadDropzoneCompoundData,
    defaultVariants: fileUploadDefaults,
  },
);

export interface FileUploadDropzoneProps
  extends React.ComponentProps<typeof Ark.Dropzone>, FileUploadDropzoneContract<React.ReactNode> {}

/**
 * The area files are dropped on.
 *
 * @remarks
 * The dropzone is the control, and the button inside it is a second way in rather
 * than the only one, which is why `disableClick` is never set: clicking anywhere on
 * the area opens the picker.
 */
export function FileUploadDropzone({
  title,
  description,
  icon,
  className,
  children,
  ...rest
}: FileUploadDropzoneProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.Dropzone
      {...rest}
      data-slot="file-upload-dropzone"
      className={cn(fileUploadDropzone(variants), className)}
    >
      <span
        data-slot="file-upload-leading-icon"
        className={cn(
          "shrink-0 text-dimmed [&>svg]:size-full",
          fileUploadSizeData.leadingIcon[variants.size],
        )}
      >
        {icon ?? <UploadCloud />}
      </span>
      <p
        data-slot="file-upload-title"
        className={cn("font-medium text-highlighted", fileUploadSizeData.title[variants.size])}
      >
        {title ?? "Drop a file here"}
      </p>
      {description != null && (
        <p
          data-slot="file-upload-description"
          className={cn("text-muted", fileUploadSizeData.description[variants.size])}
        >
          {description}
        </p>
      )}
      {children}
    </Ark.Dropzone>
  );
}
