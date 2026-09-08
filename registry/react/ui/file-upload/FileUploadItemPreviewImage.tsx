import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemPreviewImageProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ItemPreviewImage>,
  "children"
> {}

export default function FileUploadItemPreviewImage({
  className,
  ...props
}: FileUploadItemPreviewImageProps) {
  const styles = fileUpload();

  return <Ark.ItemPreviewImage className={cn(styles.itemPreviewImage(), className)} {...props} />;
}
