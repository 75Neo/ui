import type React from "react";
import { cn, mainHeightClass } from "@75neo/themes";

export interface MainProps extends React.HTMLAttributes<HTMLElement> {}

/** The page's content region, sized to fill what the Header leaves. */
export function Main({ className, children, ...rest }: MainProps) {
  return (
    <main {...rest} data-slot="main" className={cn(mainHeightClass, className)}>
      {children}
    </main>
  );
}
