import type React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import {
  cn,
  navigationMenuDefaults,
  navigationMenuOrientationData,
  navigationMenuSizeData,
  type NavigationMenuTriggerProps as NavigationMenuTriggerContract,
} from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuTrigger = cva(
  "group/trigger inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted disabled:cursor-not-allowed disabled:opacity-75 data-[state=open]:bg-elevated data-[state=open]:text-highlighted",
  {
    variants: {
      size: navigationMenuSizeData.trigger,
      orientation: navigationMenuOrientationData.trigger,
    },
    defaultVariants: navigationMenuDefaults,
  },
);

export interface NavigationMenuTriggerProps
  extends
    React.ComponentProps<typeof Ark.Trigger>,
    NavigationMenuTriggerContract<React.ReactNode> {}

export function NavigationMenuTrigger({
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: NavigationMenuTriggerProps) {
  const variants = useNavigationMenuVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTrigger(variants), className)}
    >
      {leadingIcon != null && (
        <span
          data-slot="navigation-menu-leading-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            navigationMenuSizeData.leadingIcon[variants.size],
          )}
        >
          {leadingIcon}
        </span>
      )}
      {children}
      <span
        data-slot="navigation-menu-trailing-icon"
        className={cn(
          "shrink-0 text-dimmed transition-transform duration-200 group-data-[state=open]/trigger:rotate-180 [&>svg]:size-full",
          navigationMenuSizeData.trailingIcon[variants.size],
        )}
      >
        {trailingIcon ?? <ChevronDown />}
      </span>
    </Ark.Trigger>
  );
}
