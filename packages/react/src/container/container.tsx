import type React from "react";
import { cn, containerClass } from "@75neo/themes";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

/** The measure every page's content is held to. */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div {...rest} data-slot="container" className={cn(containerClass, className)}>
      {children}
    </div>
  );
}
