import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { X } from "lucide-react";
import { cn } from "@75neo/themes";

export interface DrawerCloseTriggerProps extends React.ComponentProps<typeof Ark.CloseTrigger> {}

export function DrawerCloseTrigger({ className, children, ...rest }: DrawerCloseTriggerProps) {
  return (
    <Ark.CloseTrigger
      {...rest}
      aria-label="Close drawer"
      data-slot="drawer-close-trigger"
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed [&>svg]:size-full",
        className,
      )}
    >
      {children ?? <X />}
    </Ark.CloseTrigger>
  );
}
