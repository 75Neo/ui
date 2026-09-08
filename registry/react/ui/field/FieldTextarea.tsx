import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

export interface FieldTextareaProps extends React.ComponentPropsWithRef<typeof Ark.Textarea> {}

export default function FieldTextarea({ className, ...props }: FieldTextareaProps) {
  return <Ark.Textarea className={cn(styles.textarea(), className)} {...props} />;
}
