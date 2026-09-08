import React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cn } from "cn";
import { fileUpload } from "@/registry/shared/lib/file-upload.styles";

export interface FileUploadItemGroupProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemGroup
> {}

export default function FileUploadItemGroup({
  className,
  children,
  ...props
}: FileUploadItemGroupProps) {
  const styles = fileUpload();

  return (
    <Ark.ItemGroup className={cn(styles.itemGroup(), className)} {...props}>
      {children}
    </Ark.ItemGroup>
  );
}
