import React from "react";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

export interface TableCellProps extends React.ComponentPropsWithRef<"td"> {}

export default function TableCell({ className, ...props }: TableCellProps) {
  const styles = table();

  return <td className={cn(styles.cell(), className)} {...props} />;
}
