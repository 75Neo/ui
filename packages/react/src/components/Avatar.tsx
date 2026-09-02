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
   * Render a custom image element in place of the default one, for `next/image` or
   * anything else that has to merge Ark's own image props. Return `null` for no image.
   *
   * @remarks
   * Spread `props` onto the element, and apply `className` and `data-slot="image"` too,
   * or theme overrides will miss it. Honour `hidden` yourself: Ark hides the image
   * until it loads, and some components drop the attribute, so apply `visibility`
   * instead when your element is one of them.
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

  // An explicit fallback wins outright, `null` included. Otherwise a name gives its
  // initials, and an unusable name gives nothing.
  const initials = name ? getAvatarInitials(name) : "";
  const fallbackContent = fallback !== undefined ? fallback : initials || undefined;

  return (
    <Ark.Root {...rest} data-slot="base" className={theme.class.base}>
      <Ark.Fallback data-slot="fallback" className={theme.class.fallback}>
        {fallbackContent}
      </Ark.Fallback>

      {src ? (
        renderImage ? (
          <Ark.Context>
            {(api) => {
              const { hidden, ...imageProps } = api.getImageProps() as Record<string, unknown> & {
                hidden?: boolean;
              };

              return renderImage({
                src,
                alt: alt ?? "",
                className: theme.class.image,
                hidden: Boolean(hidden),
                props: imageProps,
              });
            }}
          </Ark.Context>
        ) : (
          <Ark.Image data-slot="image" className={theme.class.image} src={src} alt={alt ?? ""} />
        )
      ) : null}
    </Ark.Root>
  );
}
