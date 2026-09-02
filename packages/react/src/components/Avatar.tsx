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
   * Render a custom image element in place of the default `<img>`, for `next/image`
   * or anything else that has to merge Ark's own image props.
   *
   * Everything Ark would have put on the element arrives in `props`, minus `hidden`,
   * which is handed over separately because Ark hides the image until it loads and
   * some components drop the attribute -- Next's `Image` does, so honour it with
   * `visibility` instead. The caller also applies `className` and `data-slot="image"`,
   * without which `ui.image` and theme overrides miss the element. Return `null` to
   * render no image at all.
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

  // An explicit fallback wins outright, including `null` to render nothing at all;
  // a name falls back to its initials, and an unusable name to nothing.
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
