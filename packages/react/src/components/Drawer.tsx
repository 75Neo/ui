import type React from "react";
import { Drawer as Ark, type DrawerRootProps } from "@ark-ui/react/drawer";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import { drawer, type DrawerProps as DrawerContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Drawer.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute takes a
 * string for a tooltip where this component's is the panel's heading, and `role`
 * because Ark's is a narrower union than the DOM's.
 *
 * `children` is the trigger, not the body. See the note on `DrawerProps` in
 * `@75neo/themes` for why the default slot is spent on the one element a caller has to
 * own.
 */
export interface DrawerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "role" | "dir" | "draggable">,
    Pick<DrawerRootProps, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    DrawerContract<React.ReactNode> {
  /** The element that opens the drawer. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
  /** Replaces the whole header, including the title, description and close button. */
  header?: React.ReactNode;
  /** The panel's main content. */
  body?: React.ReactNode;
  /** The row along the bottom of the panel, usually buttons. */
  footer?: React.ReactNode;
}

export function Drawer({
  ui,
  placement = "right",
  size,
  transition,
  title,
  description,
  overlay = true,
  dismissible = true,
  close = true,
  closeIcon,
  modal,
  role,
  draggable,
  portal = true,
  lazyMount,
  unmountOnExit,
  children,
  header,
  body,
  footer,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: DrawerProps) {
  const theme = useResolvedTheme(drawer, "drawer", { ui, placement, size, transition }, className);

  /*
   * Ark spells the two halves of dismissal separately, and a caller thinking about a
   * confirmation drawer is thinking about both at once, so one prop drives both. Left
   * `undefined` rather than `true` when it is on, so Ark's own defaults stand.
   */
  const dismiss = dismissible ? undefined : false;

  /*
   * Ark's swipe vocabulary is logical — `start` and `end`, no left and right — so the
   * placement maps onto it. The recipe's rounding follows the same direction, which
   * keeps the swipe side and the drawn side together in both reading directions.
   */
  const swipeDirection =
    placement === "top"
      ? "up"
      : placement === "bottom"
        ? "down"
        : placement === "left"
          ? "start"
          : "end";

  const panel = (
    <>
      {overlay && <Ark.Backdrop data-slot="overlay" className={theme.class.overlay} />}
      <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
        <Ark.Content {...rest} data-slot="base" className={theme.class.base} draggable={draggable}>
          {header ?? (
            <header data-slot="header" className={theme.class.header}>
              <div data-slot="wrapper" className={theme.class.wrapper}>
                {title != null && (
                  <Ark.Title data-slot="title" className={theme.class.title}>
                    {title}
                  </Ark.Title>
                )}
                {description != null && (
                  <Ark.Description data-slot="description" className={theme.class.description}>
                    {description}
                  </Ark.Description>
                )}
              </div>

              {close && (
                <Ark.CloseTrigger
                  aria-label="Close drawer"
                  data-slot="closeTrigger"
                  className={theme.class.closeTrigger}
                >
                  {closeIcon ?? <X />}
                </Ark.CloseTrigger>
              )}
            </header>
          )}

          {body != null && (
            <div data-slot="body" className={theme.class.body}>
              {body}
            </div>
          )}

          {footer != null && (
            <footer data-slot="footer" className={theme.class.footer}>
              {footer}
            </footer>
          )}
        </Ark.Content>
      </Ark.Positioner>
    </>
  );

  return (
    <Ark.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      closeOnEscape={dismiss}
      closeOnInteractOutside={dismiss}
      modal={modal}
      role={role}
      swipeDirection={swipeDirection}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
      ids={ids}
    >
      {/* The caller's own element becomes the trigger, so it can be a themed Button
          carrying Ark's props rather than something this component wraps in one. */}
      {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}

      {portal ? <Portal>{panel}</Portal> : panel}
    </Ark.Root>
  );
}
