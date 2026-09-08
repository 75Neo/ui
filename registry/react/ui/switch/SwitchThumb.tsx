import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchStyles as styles } from "@/registry/shared/lib/switch.styles";

export interface SwitchThumbProps extends React.ComponentPropsWithRef<typeof Ark.Thumb> {}

export default function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return <Ark.Thumb className={cn(styles.thumb(), className)} {...props} />;
}
