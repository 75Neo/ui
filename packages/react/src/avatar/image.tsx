import type React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { cn, type AvatarImageProps as AvatarImageContract } from "@75neo/themes";

export interface AvatarImageProps
  extends Omit<React.ComponentProps<typeof Ark.Image>, "src" | "alt">, AvatarImageContract {}

export function AvatarImage({ src, alt, className, ...rest }: AvatarImageProps) {
  return (
    <Ark.Image
      {...rest}
      src={src}
      alt={alt ?? ""}
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
    />
  );
}
