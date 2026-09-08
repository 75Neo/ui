import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

export interface EditableInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function EditableInput({ className, ...props }: EditableInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
