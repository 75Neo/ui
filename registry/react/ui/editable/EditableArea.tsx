import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

export interface EditableAreaProps extends React.ComponentPropsWithRef<typeof Ark.Area> {}

export default function EditableArea({ className, children, ...props }: EditableAreaProps) {
  const styles = editable();

  return (
    <Ark.Area className={cn(styles.area(), className)} {...props}>
      {children}
    </Ark.Area>
  );
}
