import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

export interface EditableInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function EditableInput({ className, ...props }: EditableInputProps) {
  const styles = editable();

  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
