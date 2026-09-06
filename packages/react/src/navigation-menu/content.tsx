import type React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { cn, navigationMenuDefaults, navigationMenuOrientationData } from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuContent = cva(
  "absolute z-50 flex max-w-[min(26rem,calc(100vw-2rem))] min-w-52 flex-col gap-0.5 rounded-md bg-default p-1.5 shadow-lg ring ring-accented outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
  {
    variants: { orientation: navigationMenuOrientationData.content },
    defaultVariants: navigationMenuDefaults,
  },
);

export interface NavigationMenuContentProps extends React.ComponentProps<typeof Ark.Content> {}

export function NavigationMenuContent({
  className,
  children,
  ...rest
}: NavigationMenuContentProps) {
  const variants = useNavigationMenuVariants();

  return (
    <Ark.Content
      {...rest}
      data-slot="navigation-menu-content"
      className={cn(navigationMenuContent(variants), className)}
    >
      {children}
    </Ark.Content>
  );
}
