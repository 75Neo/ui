import * as React from "react";
import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { avatar, type AvatarVariants } from "@75neo/styles";
import { avatarKey, resolveAvatarFallback, type AvatarUI } from "@75neo/core";
import { useComponentUI } from "../hooks/useComponentUI";
import { renderSlot, type Slot } from "../utils/renderSlot";

export type AvatarProps = Omit<
  React.ComponentProps<typeof ArkAvatar.Root>,
  "children" | "content" | "icon"
> & {
  src?: string;
  alt?: string;
  /** Fallback text; when omitted, initials are derived from `alt`. */
  text?: string;
  size?: AvatarVariants["size"];
  color?: AvatarVariants["color"];
  shape?: AvatarVariants["shape"];
  ui?: AvatarUI;
  /** Mirrors Vue's `#icon` slot; takes precedence over the fallback text. */
  icon?: Slot;
  /** Mirrors Vue's `#fallback` slot; falls back to the resolved initials. */
  fallback?: Slot<{ initials: string }>;
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ ui, size, color, shape, src, alt, text, icon, fallback, className, ...props }, ref) => {
    const tvSlots = React.useMemo(() => avatar({ size, color, shape }), [size, color, shape]);
    const resolved = useComponentUI(avatarKey, tvSlots, ui);

    const initials = resolveAvatarFallback(text, alt);

    return (
      <ArkAvatar.Root
        ref={ref}
        className={resolved.root({ className })}
        data-slot="root"
        {...props}
      >
        {src && (
          <ArkAvatar.Image
            src={src}
            alt={alt ?? ""}
            data-slot="image"
            className={resolved.image()}
          />
        )}
        <ArkAvatar.Fallback data-slot="fallback" className={resolved.fallback()}>
          {icon != null ? (
            <span data-slot="icon" className={resolved.icon()}>
              {renderSlot(icon)}
            </span>
          ) : (
            renderSlot(fallback, { initials }, initials)
          )}
        </ArkAvatar.Fallback>
      </ArkAvatar.Root>
    );
  },
);
Avatar.displayName = "Avatar";
