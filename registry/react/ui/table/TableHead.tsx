import React from "react";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

export interface TableHeadProps extends React.ComponentPropsWithRef<"th"> {}

export default function TableHead({ className, ...props }: TableHeadProps) {
  const styles = table();

  return <th className={cn(styles.head(), className)} {...props} />;
}
