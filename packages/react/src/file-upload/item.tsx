import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import {
  cn,
  fileUploadDefaults,
  fileUploadSizeData,
  isPreviewableFile,
  type FileUploadItemProps as FileUploadItemContract,
} from "@75neo/themes";
import { useFileUploadVariants } from "./variants";
import { FileUploadItemDeleteTrigger } from "./item-delete-trigger";
import { FileUploadItemName } from "./item-name";
import { FileUploadItemPreview } from "./item-preview";
import { FileUploadItemSizeText } from "./item-size-text";

const fileUploadItem = cva(
  "flex min-w-0 items-center rounded-md bg-elevated/50 ring ring-muted ring-inset",
  {
    variants: { size: fileUploadSizeData.item },
    defaultVariants: fileUploadDefaults,
  },
);

export interface FileUploadItemProps
  extends React.ComponentProps<typeof Ark.Item>, FileUploadItemContract<React.ReactNode> {}

export function FileUploadItem({
  file,
  preview = true,
  deleteIcon,
  className,
  children,
  ...rest
}: FileUploadItemProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.Item
      {...rest}
      file={file}
      data-slot="file-upload-item"
      className={cn(fileUploadItem(variants), className)}
    >
      {children ?? (
        <>
          {/* Drawn for an image and skipped for anything else, so a row's height
              comes from its text and does not jump between kinds. */}
          {preview && isPreviewableFile(file) && <FileUploadItemPreview />}
          <span data-slot="file-upload-item-body" className="flex min-w-0 flex-1 flex-col">
            <FileUploadItemName>{file.name}</FileUploadItemName>
            <FileUploadItemSizeText />
          </span>
          <FileUploadItemDeleteTrigger>{deleteIcon}</FileUploadItemDeleteTrigger>
        </>
      )}
    </Ark.Item>
  );
}
