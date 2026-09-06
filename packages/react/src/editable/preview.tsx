import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cva } from "class-variance-authority";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editablePreview = cva(
  "col-start-1 row-start-1 min-w-0 cursor-text truncate rounded-md text-toned hover:bg-elevated data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[placeholder-shown]:text-dimmed",
  {
    variants: { size: editableSizeData.preview },
    defaultVariants: editableDefaults,
  },
);

export interface EditablePreviewProps extends React.ComponentProps<typeof Ark.Preview> {}

export function EditablePreview({ className, children, ...rest }: EditablePreviewProps) {
  const variants = useEditableVariants();

  return (
    <Ark.Preview
      {...rest}
      data-slot="editable-preview"
      className={cn(editablePreview(variants), className)}
    >
      {children}
    </Ark.Preview>
  );
}
