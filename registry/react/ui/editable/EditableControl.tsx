import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

export interface EditableControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function EditableControl({ className, children, ...props }: EditableControlProps) {
  const styles = editable();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
