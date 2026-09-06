import type React from "react";
import { cn } from "@75neo/themes";

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerBody({ className, children, ...rest }: DrawerBodyProps) {
  return (
    <div
      {...rest}
      data-slot="drawer-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-sm/6 text-toned",
        className,
      )}
    >
      {children}
    </div>
  );
}
