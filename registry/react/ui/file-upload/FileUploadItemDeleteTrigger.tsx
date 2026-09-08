import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemDeleteTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemDeleteTrigger
> {}

export default function FileUploadItemDeleteTrigger({
  className,
  children,
  ...props
}: FileUploadItemDeleteTriggerProps) {
  const styles = fileUpload();

  return (
    <Ark.ItemDeleteTrigger className={cn(styles.itemDeleteTrigger(), className)} {...props}>
      {children}
    </Ark.ItemDeleteTrigger>
  );
}
