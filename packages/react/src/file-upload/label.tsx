import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadLabel = cva("font-medium text-highlighted select-none", {
  variants: { size: fileUploadSizeData.label },
  defaultVariants: fileUploadDefaults,
});

export interface FileUploadLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function FileUploadLabel({ className, children, ...rest }: FileUploadLabelProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.Label
      {...rest}
      data-slot="file-upload-label"
      className={cn(fileUploadLabel(variants), className)}
    >
      {children}
    </Ark.Label>
  );
}
