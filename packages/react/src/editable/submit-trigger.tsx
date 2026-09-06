import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableSubmitTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: editableSizeData.submitTrigger },
    defaultVariants: editableDefaults,
  },
);

export interface EditableSubmitTriggerProps extends React.ComponentProps<
  typeof Ark.SubmitTrigger
> {}

export function EditableSubmitTrigger({
  className,
  children,
  ...rest
}: EditableSubmitTriggerProps) {
  const variants = useEditableVariants();

  return (
    <Ark.SubmitTrigger
      {...rest}
      data-slot="editable-submit-trigger"
      className={cn(editableSubmitTrigger(variants), className)}
    >
      {children ?? <Check />}
    </Ark.SubmitTrigger>
  );
}
