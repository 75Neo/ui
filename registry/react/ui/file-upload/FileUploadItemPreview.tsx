import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemPreviewProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemPreview
> {}

export default function FileUploadItemPreview({
  className,
  children,
  ...props
}: FileUploadItemPreviewProps) {
  const styles = fileUpload();

  return (
    <Ark.ItemPreview className={cn(styles.itemPreview(), className)} {...props}>
      {children}
    </Ark.ItemPreview>
  );
}
