import type React from "react";
import { cn, footerClasses } from "@75neo/themes";

export interface FooterEndProps extends React.HTMLAttributes<HTMLDivElement> {}

/** The end of the row, usually social or legal links. */
export function FooterEnd({ className, children, ...rest }: FooterEndProps) {
  return (
    <div {...rest} data-slot="footer-end" className={cn(footerClasses.end, className)}>
      {children}
    </div>
  );
}
