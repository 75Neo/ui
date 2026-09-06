import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cva } from "class-variance-authority";
import { Pencil } from "lucide-react";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableEditTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: editableSizeData.editTrigger },
    defaultVariants: editableDefaults,
  },
);

export interface EditableEditTriggerProps extends React.ComponentProps<typeof Ark.EditTrigger> {}

export function EditableEditTrigger({ className, children, ...rest }: EditableEditTriggerProps) {
  const variants = useEditableVariants();

  return (
    <Ark.EditTrigger
      {...rest}
      data-slot="editable-edit-trigger"
      className={cn(editableEditTrigger(variants), className)}
    >
      {children ?? <Pencil />}
    </Ark.EditTrigger>
  );
}
