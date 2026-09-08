import React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { cn } from "cn";
import { avatarStyles as styles } from "@/registry/shared/lib/avatar.styles";

export interface AvatarFallbackProps extends React.ComponentPropsWithRef<typeof Ark.Fallback> {}

export default function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <Ark.Fallback className={cn(styles.fallback(), className)} {...props}>
      {children}
    </Ark.Fallback>
  );
}
