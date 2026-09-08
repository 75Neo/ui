import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemNameProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ItemName>,
  "children"
> {}

export default function FileUploadItemName({ className, ...props }: FileUploadItemNameProps) {
  const styles = fileUpload();

  return <Ark.ItemName className={cn(styles.itemName(), className)} {...props} />;
}
