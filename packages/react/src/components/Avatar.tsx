import * as React from "react";
import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { avatar, type AvatarVariants, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../hooks/useComponentUI";

export type AvatarUI = {
  root?: SlotClass;
  image?: SlotClass;
  fallback?: SlotClass;
};

export type AvatarProps = Omit<React.ComponentProps<typeof ArkAvatar.Root>, "children"> & {
  size?: AvatarVariants["size"];
  shape?: AvatarVariants["shape"];
  src?: string;
  alt?: string;
  name?: string;
  fallback?: React.ReactNode;
  ui?: AvatarUI;
  children?: React.ReactNode;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ ui, size, shape, src, alt, name, fallback, children, className, ...props }, ref) => {
    const tvSlots = React.useMemo(() => avatar({ size, shape }), [size, shape]);
    const resolved = useComponentUI("avatar", tvSlots, ui);

    const fallbackContent = React.useMemo(() => {
      if (fallback !== undefined) return fallback;
      if (name) return getInitials(name);
      return undefined;
    }, [fallback, name]);

    if (children) {
      return (
        <ArkAvatar.Root
          ref={ref}
          className={resolved.root({ className })}
          data-slot="root"
          {...props}
        >
          {children}
        </ArkAvatar.Root>
      );
    }

    return (
      <ArkAvatar.Root
        ref={ref}
        className={resolved.root({ className })}
        data-slot="root"
        {...props}
      >
        <ArkAvatar.Fallback className={resolved.fallback()} data-slot="fallback">
          {fallbackContent}
        </ArkAvatar.Fallback>
        {src && (
          <ArkAvatar.Image
            src={src}
            alt={alt ?? ""}
            className={resolved.image()}
            data-slot="image"
          />
        )}
      </ArkAvatar.Root>
    );
  },
);
Avatar.displayName = "Avatar";

// --- Primitive exports for composition ---

export const AvatarRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAvatar.Root> & {
    size?: AvatarVariants["size"];
    shape?: AvatarVariants["shape"];
    ui?: AvatarUI;
  }
>(({ size, shape, ui, className, ...props }, ref) => {
  const tvSlots = React.useMemo(() => avatar({ size, shape }), [size, shape]);
  const resolved = useComponentUI("avatar", tvSlots, ui);
  return (
    <ArkAvatar.Root
      ref={ref}
      className={resolved.root({ className })}
      data-slot="root"
      {...props}
    />
  );
});
AvatarRoot.displayName = "AvatarRoot";

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof ArkAvatar.Fallback> & { ui?: AvatarUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => avatar({}), []);
  const resolved = useComponentUI("avatar", tvSlots, ui);
  return (
    <ArkAvatar.Fallback
      ref={ref}
      className={resolved.fallback({ className })}
      data-slot="fallback"
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentProps<typeof ArkAvatar.Image> & { ui?: AvatarUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => avatar({}), []);
  const resolved = useComponentUI("avatar", tvSlots, ui);
  return (
    <ArkAvatar.Image
      ref={ref}
      className={resolved.image({ className })}
      data-slot="image"
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

export const AvatarContext = ArkAvatar.Context;
