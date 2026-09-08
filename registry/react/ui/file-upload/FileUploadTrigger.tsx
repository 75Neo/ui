import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function FileUploadTrigger({
  className,
  children,
  ...props
}: FileUploadTriggerProps) {
  const styles = fileUpload();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
