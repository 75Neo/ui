import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuSeparatorProps extends React.ComponentPropsWithRef<typeof Ark.Separator> {}

export default function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  const styles = menu();

  return <Ark.Separator className={cn(styles.separator(), className)} {...props} />;
}
