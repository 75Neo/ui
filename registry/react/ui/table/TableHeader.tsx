import React from "react";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

export interface TableHeaderProps extends React.ComponentPropsWithRef<"thead"> {}

export default function TableHeader({ className, ...props }: TableHeaderProps) {
  const styles = table();

  return <thead className={cn(styles.header(), className)} {...props} />;
}
