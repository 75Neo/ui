import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

export interface EditableLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function EditableLabel({ className, children, ...props }: EditableLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
