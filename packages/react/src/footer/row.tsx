import type React from "react";
import { cn, footerClasses } from "@75neo/themes";

export interface FooterRowProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * The three-region row, held to the Container's measure.
 *
 * @remarks
 * The regions go into the DOM in the order end, center, start and are put back into
 * reading order by their own order classes, so a phone stacks the links above the
 * copyright.
 */
export function FooterRow({ className, children, ...rest }: FooterRowProps) {
  return (
    <div {...rest} data-slot="footer-row" className={cn(footerClasses.row, className)}>
      {children}
    </div>
  );
}
