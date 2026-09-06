import type React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { cva } from "class-variance-authority";
import {
  avatarColorData,
  avatarDefaults,
  avatarRootCompoundData,
  avatarShapeData,
  avatarSizeData,
  cn,
  type AvatarRootProps as AvatarContract,
} from "@75neo/themes";
import { AvatarVariantsContext } from "./variants";

const avatarRoot = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden align-middle select-none",
  {
    variants: {
      color: avatarColorData.root,
      size: avatarSizeData.root,
      shape: avatarShapeData.root,
    },
    compoundVariants: avatarRootCompoundData,
    defaultVariants: avatarDefaults,
  },
);

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, AvatarContract {
  children?: React.ReactNode;
}

export function Avatar({ color, size, shape, className, children, ...rest }: AvatarProps) {
  const resolved = {
    color: color ?? avatarDefaults.color,
    size: size ?? avatarDefaults.size,
    shape: shape ?? avatarDefaults.shape,
  };

  return (
    <AvatarVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="avatar"
        data-color={resolved.color}
        data-size={resolved.size}
        data-shape={resolved.shape}
        className={cn(avatarRoot(resolved), className)}
      >
        {children}
      </Ark.Root>
    </AvatarVariantsContext.Provider>
  );
}
