import type React from "react";
import { cn, footerClasses } from "@75neo/themes";

export interface FooterTopProps extends React.HTMLAttributes<HTMLDivElement> {}

/** A full-width band above the row. */
export function FooterTop({ className, children, ...rest }: FooterTopProps) {
  return (
    <div {...rest} data-slot="footer-top" className={cn(footerClasses.band, className)}>
      {children}
    </div>
  );
}
