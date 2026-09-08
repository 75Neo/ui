import React from "react";
import { Fieldset as Ark } from "@ark-ui/react/fieldset";
import { cn } from "cn";
import { fieldset } from "@/registry/shared/lib/fieldset.styles";

export interface FieldsetLegendProps extends React.ComponentPropsWithRef<typeof Ark.Legend> {}

export default function FieldsetLegend({ className, children, ...props }: FieldsetLegendProps) {
  const styles = fieldset();

  return (
    <Ark.Legend className={cn(styles.legend(), className)} {...props}>
      {children}
    </Ark.Legend>
  );
}
