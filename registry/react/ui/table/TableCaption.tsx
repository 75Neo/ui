import React from "react";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

export interface TableCaptionProps extends React.ComponentPropsWithRef<"caption"> {}

export default function TableCaption({ className, ...props }: TableCaptionProps) {
  const styles = table();

  return <caption className={cn(styles.caption(), className)} {...props} />;
}
