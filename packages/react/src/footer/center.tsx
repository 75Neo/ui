import type React from "react";
import { cn, footerClasses } from "@75neo/themes";

export interface FooterCenterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** The middle of the row, usually a short navigation. */
export function FooterCenter({ className, children, ...rest }: FooterCenterProps) {
  return (
    <div {...rest} data-slot="footer-center" className={cn(footerClasses.center, className)}>
      {children}
    </div>
  );
}
