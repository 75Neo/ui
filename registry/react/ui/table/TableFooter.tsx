import React from "react";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

export interface TableFooterProps extends React.ComponentPropsWithRef<"tfoot"> {}

export default function TableFooter({ className, ...props }: TableFooterProps) {
  return <tfoot className={cn(styles.footer(), className)} {...props} />;
}
