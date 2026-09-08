import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUploadStyles as styles } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemPreviewImageProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ItemPreviewImage>,
  "children"
> {}

export default function FileUploadItemPreviewImage({
  className,
  ...props
}: FileUploadItemPreviewImageProps) {
  return <Ark.ItemPreviewImage className={cn(styles.itemPreviewImage(), className)} {...props} />;
}
