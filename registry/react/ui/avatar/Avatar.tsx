import React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { cn } from "cn";
import { avatarStyles as styles, type AvatarSize } from "@/registry/shared/lib/avatar.styles";

export interface AvatarProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: AvatarSize;
}

export default function Avatar({ size = "md", className, children, ...props }: AvatarProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
