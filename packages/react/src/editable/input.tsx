import type React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cva } from "class-variance-authority";
import { cn, editableDefaults, editableInputCompoundData, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableInput = cva(
  "col-start-1 row-start-1 min-w-0 rounded-md bg-default text-highlighted ring ring-accented outline-none ring-inset placeholder:text-dimmed disabled:cursor-not-allowed data-invalid:ring-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: editableSizeData.input,
    },
    compoundVariants: editableInputCompoundData,
    defaultVariants: editableDefaults,
  },
);

export interface EditableInputProps extends React.ComponentProps<typeof Ark.Input> {
  /** Shown while the field is empty. */
  placeholder?: string;
}

export function EditableInput({ placeholder, className, ...rest }: EditableInputProps) {
  const variants = useEditableVariants();

  return (
    <Ark.Input
      {...rest}
      data-slot="editable-input"
      placeholder={placeholder}
      className={cn(editableInput(variants), className)}
    />
  );
}
