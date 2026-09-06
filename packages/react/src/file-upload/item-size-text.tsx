import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemSizeText = cva("text-dimmed tabular-nums", {
  variants: { size: fileUploadSizeData.itemSizeText },
  defaultVariants: fileUploadDefaults,
});

export interface FileUploadItemSizeTextProps extends React.ComponentProps<
  typeof Ark.ItemSizeText
> {}

export function FileUploadItemSizeText({
  className,
  children,
  ...rest
}: FileUploadItemSizeTextProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.ItemSizeText
      {...rest}
      data-slot="file-upload-item-size-text"
      className={cn(fileUploadItemSizeText(variants), className)}
    >
      {children}
    </Ark.ItemSizeText>
  );
}
