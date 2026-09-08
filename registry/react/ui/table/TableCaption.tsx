import React from "react";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

export interface TableCaptionProps extends React.ComponentPropsWithRef<"caption"> {}

export default function TableCaption({ className, ...props }: TableCaptionProps) {
  return <caption className={cn(styles.caption(), className)} {...props} />;
}
