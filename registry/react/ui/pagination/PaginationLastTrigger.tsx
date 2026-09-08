import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

export interface PaginationLastTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.LastTrigger
> {}

export default function PaginationLastTrigger({
  className,
  children,
  ...props
}: PaginationLastTriggerProps) {
  const styles = pagination();

  return (
    <Ark.LastTrigger className={cn(styles.lastTrigger(), className)} {...props}>
      {children}
    </Ark.LastTrigger>
  );
}
