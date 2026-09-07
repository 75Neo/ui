import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

export interface FieldProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Field({ className, children, ...props }: FieldProps) {
  const styles = field();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
