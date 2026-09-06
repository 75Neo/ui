import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemName = cva("truncate font-medium text-highlighted", {
  variants: { size: fileUploadSizeData.itemName },
  defaultVariants: fileUploadDefaults,
});

export interface FileUploadItemNameProps extends React.ComponentProps<typeof Ark.ItemName> {}

export function FileUploadItemName({ className, children, ...rest }: FileUploadItemNameProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.ItemName
      {...rest}
      data-slot="file-upload-item-name"
      className={cn(fileUploadItemName(variants), className)}
    >
      {children}
    </Ark.ItemName>
  );
}
