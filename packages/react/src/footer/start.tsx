import type React from "react";
import { cn, footerClasses } from "@75neo/themes";

export interface FooterStartProps extends React.HTMLAttributes<HTMLDivElement> {}

/** The start of the row, usually a copyright line. */
export function FooterStart({ className, children, ...rest }: FooterStartProps) {
  return (
    <div {...rest} data-slot="footer-start" className={cn(footerClasses.start, className)}>
      {children}
    </div>
  );
}
