import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuArrowTipProps extends React.ComponentPropsWithRef<typeof Ark.ArrowTip> {}

export default function MenuArrowTip({ className, ...props }: MenuArrowTipProps) {
  const styles = menu();

  return <Ark.ArrowTip className={cn(styles.arrowTip(), className)} {...props} />;
}
