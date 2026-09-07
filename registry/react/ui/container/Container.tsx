import React from "react";
import { cn } from "cn";
import { container } from "@/registry/shared/lib/container.styles";

export interface ContainerProps extends React.ComponentPropsWithRef<"div"> {}

export default function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn(container(), className)} {...props}>
      {children}
    </div>
  );
}
