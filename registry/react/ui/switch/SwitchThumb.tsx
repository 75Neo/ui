import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchRecipe } from "@/registry/shared/lib/switch.styles";

export interface SwitchThumbProps extends React.ComponentPropsWithRef<typeof Ark.Thumb> {}

export default function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  const styles = switchRecipe();

  return <Ark.Thumb className={cn(styles.thumb(), className)} {...props} />;
}
