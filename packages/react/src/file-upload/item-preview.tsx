import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemPreview = cva("shrink-0 overflow-hidden rounded-sm bg-accented", {
  variants: { size: fileUploadSizeData.itemPreview },
  defaultVariants: fileUploadDefaults,
});

export interface FileUploadItemPreviewProps extends React.ComponentProps<typeof Ark.ItemPreview> {}

export function FileUploadItemPreview({
  type = "image/*",
  className,
  children,
  ...rest
}: FileUploadItemPreviewProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.ItemPreview
      {...rest}
      type={type}
      data-slot="file-upload-item-preview"
      className={cn(fileUploadItemPreview(variants), className)}
    >
      {children ?? (
        <Ark.ItemPreviewImage
          data-slot="file-upload-item-preview-image"
          className="size-full object-cover"
        />
      )}
    </Ark.ItemPreview>
  );
}
