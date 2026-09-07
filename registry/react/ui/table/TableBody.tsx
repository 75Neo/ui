import React from "react";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

export interface TableBodyProps extends React.ComponentPropsWithRef<"tbody"> {}

export default function TableBody({ className, ...props }: TableBodyProps) {
  const styles = table();

  return <tbody className={cn(styles.body(), className)} {...props} />;
}
