import React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { cn } from "cn";
import { avatar } from "@/registry/shared/lib/avatar.styles";

export interface AvatarImageProps extends React.ComponentPropsWithRef<typeof Ark.Image> {}

export default function AvatarImage({ className, ...props }: AvatarImageProps) {
  const styles = avatar();

  return <Ark.Image className={cn(styles.image(), className)} {...props} />;
}
