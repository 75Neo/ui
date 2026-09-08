import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

export interface PaginationFirstTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.FirstTrigger
> {}

export default function PaginationFirstTrigger({
  className,
  children,
  ...props
}: PaginationFirstTriggerProps) {
  const styles = pagination();

  return (
    <Ark.FirstTrigger className={cn(styles.firstTrigger(), className)} {...props}>
      {children}
    </Ark.FirstTrigger>
  );
}
