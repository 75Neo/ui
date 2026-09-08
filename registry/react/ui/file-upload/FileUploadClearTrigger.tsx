import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadClearTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ClearTrigger
> {}

export default function FileUploadClearTrigger({
  className,
  children,
  ...props
}: FileUploadClearTriggerProps) {
  const styles = fileUpload();

  return (
    <Ark.ClearTrigger className={cn(styles.clearTrigger(), className)} {...props}>
      {children}
    </Ark.ClearTrigger>
  );
}
