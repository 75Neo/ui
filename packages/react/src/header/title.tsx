import type React from "react";
import { cn, headerClasses, type HeaderTitleProps as HeaderTitleContract } from "@75neo/themes";

export interface HeaderTitleProps extends React.HTMLAttributes<HTMLElement>, HeaderTitleContract {}

/** The wordmark at the start of the bar. A link when given an address. */
export function HeaderTitle({ href, className, children, ...rest }: HeaderTitleProps) {
  const titleClass = cn(headerClasses.title, className);

  if (href != null) {
    return (
      <a {...rest} href={href} data-slot="header-title" className={titleClass}>
        {children}
      </a>
    );
  }

  return (
    <span {...rest} data-slot="header-title" className={titleClass}>
      {children}
    </span>
  );
}
