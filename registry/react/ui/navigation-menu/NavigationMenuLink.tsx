import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

export interface NavigationMenuLinkProps extends React.ComponentPropsWithRef<typeof Ark.Link> {}

export default function NavigationMenuLink({
  className,
  children,
  ...props
}: NavigationMenuLinkProps) {
  const styles = navigationMenu();

  return (
    <Ark.Link className={cn(styles.link(), className)} {...props}>
      {children}
    </Ark.Link>
  );
}
