import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

export interface NavigationMenuContentProps extends React.ComponentPropsWithRef<
  typeof Ark.Content
> {}

export default function NavigationMenuContent({
  className,
  children,
  ...props
}: NavigationMenuContentProps) {
  const styles = navigationMenu();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
