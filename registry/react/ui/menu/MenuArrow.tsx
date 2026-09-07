import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function MenuArrow({ className, children, ...props }: MenuArrowProps) {
  const styles = menu();

  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
