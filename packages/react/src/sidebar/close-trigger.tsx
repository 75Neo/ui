import type React from "react";
import { X } from "lucide-react";
import { cn, sidebarClasses } from "@75neo/themes";
import { useSidebarVariants } from "./variants";

export interface SidebarCloseTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarCloseTrigger({ className, children, ...rest }: SidebarCloseTriggerProps) {
  const { setOpen } = useSidebarVariants();

  return (
    <button
      {...rest}
      type="button"
      aria-label="Collapse sidebar"
      data-slot="sidebar-close-trigger"
      className={cn(sidebarClasses.closeTrigger, className)}
      onClick={() => setOpen(false)}
    >
      {children ?? <X />}
    </button>
  );
}
