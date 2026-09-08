import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function SelectList({ className, children, ...props }: SelectListProps) {
  const styles = select();

  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
