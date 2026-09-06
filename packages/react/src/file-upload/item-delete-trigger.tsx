import type React from "react";
import { FileUpload as Ark } from "@ark-ui/react/file-upload";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, fileUploadDefaults, fileUploadSizeData } from "@75neo/themes";
import { useFileUploadVariants } from "./variants";

const fileUploadItemDeleteTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-accented hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: fileUploadSizeData.itemDeleteTrigger },
    defaultVariants: fileUploadDefaults,
  },
);

export interface FileUploadItemDeleteTriggerProps extends React.ComponentProps<
  typeof Ark.ItemDeleteTrigger
> {}

export function FileUploadItemDeleteTrigger({
  className,
  children,
  ...rest
}: FileUploadItemDeleteTriggerProps) {
  const variants = useFileUploadVariants();

  return (
    <Ark.ItemDeleteTrigger
      {...rest}
      data-slot="file-upload-item-delete-trigger"
      className={cn(fileUploadItemDeleteTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.ItemDeleteTrigger>
  );
}
