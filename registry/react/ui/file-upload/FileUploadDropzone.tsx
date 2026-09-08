import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUploadStyles as styles } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadDropzoneProps extends React.ComponentPropsWithRef<typeof Ark.Dropzone> {}

export default function FileUploadDropzone({
  className,
  children,
  ...props
}: FileUploadDropzoneProps) {
  return (
    <Ark.Dropzone className={cn(styles.dropzone(), className)} {...props}>
      {children}
    </Ark.Dropzone>
  );
}
