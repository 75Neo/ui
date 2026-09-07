import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function MenuContent({ className, children, ...props }: MenuContentProps) {
  const styles = menu();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
