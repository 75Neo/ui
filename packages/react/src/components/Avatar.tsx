import type React from "react";
import { Avatar as Ark } from "@ark-ui/react/avatar";
import { type AvatarProps as AvatarContract, avatar, getAvatarInitials } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

export interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    Pick<React.ComponentProps<typeof Ark.Root>, "ids" | "onStatusChange">,
    AvatarContract<React.ReactNode> {
  /**
   * Render a custom image element instead of the default `<img>`.
   * Use this to plug in `next/image` or any other component that needs to merge
   * Ark's `getImageProps()` (which carries `hidden`, `data-state`, `onLoad`/`onError`).
   * The caller is responsible for applying `className` and handling `hidden`
   * (Next's Image ignores `hidden`, so use `visibility` as in Ark docs).
   * Return `null` to suppress the image entirely.
   */
  renderImage?: (details: {
    src: string;
    alt: string;
    className: string;
    hidden: boolean;
    props: Record<string, unknown>;
  }) => React.ReactNode;
}

export function Avatar({
  ui,
  size,
  shape,
  src,
  alt,
  name,
  fallback,
  renderImage,
  className,
  ...rest
}: AvatarProps) {
  const theme = useResolvedTheme(avatar, "avatar", { ui, size, shape }, className);

  const fallbackContent = (() => {
    if (fallback !== undefined) return fallback;
    if (name) {
      const initials = getAvatarInitials(name);
      if (initials) return initials;
    }
    return undefined;
  })();

  return (
    <Ark.Root {...rest} data-slot="base" className={theme.class.base}>
      <Ark.Fallback data-slot="fallback" className={theme.class.fallback}>
        {fallbackContent}
      </Ark.Fallback>

      {src ? (
        renderImage ? (
          <Ark.Context>
            {(api) => {
              const { hidden, ...arkProps } = api.getImageProps() as Record<string, unknown> & {
                hidden?: boolean;
              };
              const rendered = renderImage({
                src,
                alt: alt ?? "",
                className: theme.class.image,
                hidden: Boolean(hidden),
                props: arkProps as Record<string, unknown>,
              });
              // Ark.Fallback relies on data-state/hidden from getImageProps internally;
              // custom image must still expose data-slot="image" so theme selectors work.
              // If the custom element doesn't already carry it, wrap with a span that does.
              // Most renderImage implementations will spread `props` which already contains
              // data-state; we still require the caller to honour `hidden`.
              return rendered as React.ReactNode;
            }}
          </Ark.Context>
        ) : (
          <Ark.Image data-slot="image" className={theme.class.image} src={src} alt={alt ?? ""} />
        )
      ) : null}
    </Ark.Root>
  );
}
