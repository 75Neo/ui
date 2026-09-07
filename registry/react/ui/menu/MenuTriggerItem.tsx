import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuTriggerItemProps extends React.ComponentPropsWithRef<typeof Ark.TriggerItem> {}

export default function MenuTriggerItem({ className, children, ...props }: MenuTriggerItemProps) {
  const styles = menu();

  return (
    <Ark.TriggerItem className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.TriggerItem>
  );
}
