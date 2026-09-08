import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

export interface MenuArrowTipProps extends React.ComponentPropsWithRef<typeof Ark.ArrowTip> {}

export default function MenuArrowTip({ className, ...props }: MenuArrowTipProps) {
  return <Ark.ArrowTip className={cn(styles.arrowTip(), className)} {...props} />;
}
