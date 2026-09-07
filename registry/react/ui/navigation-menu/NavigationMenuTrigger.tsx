import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

export interface NavigationMenuTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.Trigger
> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export default function NavigationMenuTrigger({
  leading,
  trailing,
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  const styles = navigationMenu();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {leading ? <span className={styles.triggerLeading()}>{leading}</span> : null}
      {children}
      {trailing ? <span className={styles.triggerTrailing()}>{trailing}</span> : null}
    </Ark.Trigger>
  );
}
