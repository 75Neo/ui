import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function FileUploadItem({ className, children, ...props }: FileUploadItemProps) {
  const styles = fileUpload();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
