import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableCancelTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: editableSizeData.cancelTrigger },
    defaultVariants: editableDefaults,
  },
);

export interface EditableCancelTriggerProps extends React.ComponentProps<
  typeof Ark.CancelTrigger
> {}

export function EditableCancelTrigger({
  className,
  children,
  ...rest
}: EditableCancelTriggerProps) {
  const variants = useEditableVariants();

  return (
    <Ark.CancelTrigger
      {...rest}
      data-slot="editable-cancel-trigger"
      className={cn(editableCancelTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.CancelTrigger>
  );
}
