import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

export interface PaginationProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Pagination({ className, children, ...props }: PaginationProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
