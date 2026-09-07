import React from "react";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

export interface TableProps extends React.ComponentPropsWithRef<"table"> {
  containerClassName?: string;
}

export default function Table({ className, containerClassName, ...props }: TableProps) {
  const styles = table();

  return (
    <div className={cn(styles.container(), containerClassName)}>
      <table className={cn(styles.root(), className)} {...props} />
    </div>
  );
}
