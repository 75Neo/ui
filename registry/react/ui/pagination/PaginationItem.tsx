import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { pagination } from "@/registry/shared/lib/pagination.styles";

export interface PaginationItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function PaginationItem({ className, children, ...props }: PaginationItemProps) {
  const styles = pagination();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
