import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function FileUploadLabel({ className, children, ...props }: FileUploadLabelProps) {
  const styles = fileUpload();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
