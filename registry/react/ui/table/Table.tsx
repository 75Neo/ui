import React from "react";
import { cn } from "cn";
import { tableStyles as styles, type TableSize } from "@/registry/shared/lib/table.styles";

export interface TableProps extends React.ComponentPropsWithRef<"table"> {
  size?: TableSize;
  containerClassName?: string;
}

export default function Table({
  size = "md",
  className,
  containerClassName,
  ...props
}: TableProps) {
  return (
    <div className={cn(styles.container(), containerClassName)}>
      <table className={cn(styles.root(), className)} data-size={size} {...props} />
    </div>
  );
}
