import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editable } from "@/registry/shared/lib/editable.styles";

export interface EditableSubmitTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.SubmitTrigger
> {}

export default function EditableSubmitTrigger({
  className,
  children,
  ...props
}: EditableSubmitTriggerProps) {
  const styles = editable();

  return (
    <Ark.SubmitTrigger className={cn(styles.submitTrigger(), className)} {...props}>
      {children}
    </Ark.SubmitTrigger>
  );
}
