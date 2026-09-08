import React from "react";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

export interface TableHeaderProps extends React.ComponentPropsWithRef<"thead"> {}

export default function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn(styles.header(), className)} {...props} />;
}
