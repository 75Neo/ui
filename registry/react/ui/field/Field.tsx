import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field, type FieldSize } from "@/registry/shared/lib/field.styles";

export interface FieldProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: FieldSize;
}

export default function Field({ size = "md", className, children, ...props }: FieldProps) {
  const styles = field();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
