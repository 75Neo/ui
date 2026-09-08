import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function FileUpload({ className, children, ...props }: FileUploadProps) {
  const styles = fileUpload();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
