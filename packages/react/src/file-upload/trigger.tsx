import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import {
  cn,
  fileUploadDefaults,
  fileUploadSizeData,
  fileUploadTriggerCompoundData,
} from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-highlighted ring ring-accented transition-colors outline-none ring-inset hover:bg-elevated disabled:cursor-not-allowed disabled:opacity-75",
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
      size: fileUploadSizeData.trigger,
    },
    compoundVariants: fileUploadTriggerCompoundData,
    defaultVariants: fileUploadDefaults,
  },
);

export interface FileUploadTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {}

export function FileUploadTrigger({ className, children, ...rest }: FileUploadTriggerProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="file-upload-trigger"
      className={cn(fileUploadTrigger(variants), className)}
    >
      {children ?? "Choose a file"}
    </Ark.Trigger>
  );
}
