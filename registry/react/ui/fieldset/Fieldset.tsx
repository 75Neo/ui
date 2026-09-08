import React from "react";
import { Fieldset as Ark } from "@ark-ui/react/fieldset";
import { cn } from "cn";
import { fieldsetStyles as styles } from "@/registry/shared/lib/fieldset.styles";

export interface FieldsetProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Fieldset({ className, children, ...props }: FieldsetProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
