import React from "react";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

export interface TableRowProps extends React.ComponentPropsWithRef<"tr"> {
  selected?: boolean;
}

export default function TableRow({ selected, className, ...props }: TableRowProps) {
  return (
    <tr
      data-state={selected ? "selected" : undefined}
      className={cn(styles.row(), className)}
      {...props}
    />
  );
}
