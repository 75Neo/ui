import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemGroup = cva("flex list-none flex-col", {
  variants: { size: fileUploadSizeData.itemGroup },
  defaultVariants: fileUploadDefaults,
});

export interface FileUploadItemGroupProps extends React.ComponentProps<typeof Ark.ItemGroup> {}

export function FileUploadItemGroup({ className, children, ...rest }: FileUploadItemGroupProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.ItemGroup
      {...rest}
      data-slot="file-upload-item-group"
      className={cn(fileUploadItemGroup(variants), className)}
    >
      {children}
    </Ark.ItemGroup>
  );
}
