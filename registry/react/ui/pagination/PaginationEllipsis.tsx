import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

export interface PaginationEllipsisProps extends React.ComponentPropsWithRef<typeof Ark.Ellipsis> {}

export default function PaginationEllipsis({
  className,
  children,
  ...props
}: PaginationEllipsisProps) {
  return (
    <Ark.Ellipsis className={cn(styles.ellipsis(), className)} {...props}>
      {children}
    </Ark.Ellipsis>
  );
}
