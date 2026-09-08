import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemSizeTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ItemSizeText>,
  "children"
> {}

export default function FileUploadItemSizeText({
  className,
  ...props
}: FileUploadItemSizeTextProps) {
  const styles = fileUpload();

  return <Ark.ItemSizeText className={cn(styles.itemSizeText(), className)} {...props} />;
}
