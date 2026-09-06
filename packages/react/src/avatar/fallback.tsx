import type React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { cva } from "class-variance-authority";
import {
  avatarColorData,
  avatarDefaults,
  avatarSizeData,
  cn,
  getAvatarInitials,
  type AvatarFallbackProps as AvatarFallbackContract,
} from "@75neo/themes";
import { useAvatarVariants } from "./variants";

const avatarFallback = cva(
  "flex size-full items-center justify-center font-medium tracking-tight uppercase",
  {
    variants: {
      color: avatarColorData.fallback,
      size: avatarSizeData.fallback,
    },
    defaultVariants: avatarDefaults,
  },
);

export interface AvatarFallbackProps
  extends React.ComponentProps<typeof Ark.Fallback>, AvatarFallbackContract {}

export function AvatarFallback({ name, className, children, ...rest }: AvatarFallbackProps) {
  const variants = useAvatarVariants();

  return (
    <Ark.Fallback
      {...rest}
      data-slot="avatar-fallback"
      className={cn(avatarFallback(variants), className)}
    >
      {children ?? (name ? getAvatarInitials(name) : null)}
    </Ark.Fallback>
  );
}
