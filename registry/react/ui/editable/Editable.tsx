import React from "react";
import { Editable as Ark } from "@ark-ui/react/editable";
import { cn } from "cn";
import { editableStyles as styles } from "@/registry/shared/lib/editable.styles";

export interface EditableProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Editable({ className, children, ...props }: EditableProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
