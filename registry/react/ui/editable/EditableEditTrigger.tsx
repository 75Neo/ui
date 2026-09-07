import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

export interface EditableEditTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.EditTrigger
> {}

export default function EditableEditTrigger({
  className,
  children,
  ...props
}: EditableEditTriggerProps) {
  const styles = editable();

  return (
    <Ark.EditTrigger className={cn(styles.editTrigger(), className)} {...props}>
      {children}
    </Ark.EditTrigger>
  );
}
