import type React from "react";
import { cn, footerClasses } from "@75neo/themes";

export interface FooterBottomProps extends React.HTMLAttributes<HTMLDivElement> {}

/** A full-width band below the row. */
export function FooterBottom({ className, children, ...rest }: FooterBottomProps) {
  return (
    <div {...rest} data-slot="footer-bottom" className={cn(footerClasses.band, className)}>
      {children}
    </div>
  );
}
