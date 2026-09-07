import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

export interface FieldInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function FieldInput({ className, ...props }: FieldInputProps) {
  const styles = field();

  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
