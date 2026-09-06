import type React from "react";
import { cn } from "@75neo/themes";

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLElement> {}

export function DrawerFooter({ className, children, ...rest }: DrawerFooterProps) {
  return (
    <footer
      {...rest}
      data-slot="drawer-footer"
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-muted bg-muted/40 px-5 py-4",
        className,
      )}
    >
      {children}
    </footer>
  );
}
