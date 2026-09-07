import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

export interface EditableCancelTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.CancelTrigger
> {}

export default function EditableCancelTrigger({
  className,
  children,
  ...props
}: EditableCancelTriggerProps) {
  const styles = editable();

  return (
    <Ark.CancelTrigger className={cn(styles.cancelTrigger(), className)} {...props}>
      {children}
    </Ark.CancelTrigger>
  );
}
