import type React from "react";
import { HoverCard as Ark, type HoverCardRootProps } from "@ark-ui/react/hover-card";
import { Portal } from "@ark-ui/react/portal";
import { hoverCard, type HoverCardProps as HoverCardContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the HoverCard.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is the
 * browser's own tooltip where this component's is the card's heading.
 *
 * `children` is the trigger, not the body. See the note on `HoverCardProps` in
 * `@75neo/themes` for why the default slot is spent on the one element a caller has to
 * own.
 */
export interface HoverCardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "content">,
    Pick<HoverCardRootProps, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    HoverCardContract {
  /** The element the card appears for. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
  /** The card's main content, under the title and description. */
  body?: React.ReactNode;
}

export function HoverCard({
  ui,
  size,
  transition,
  title,
  description,
  arrow = false,
  placement = "bottom",
  offset = 8,
  openDelay,
  closeDelay,
  disabled,
  portal = true,
  lazyMount,
  unmountOnExit,
  children,
  body,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: HoverCardProps) {
  const theme = useResolvedTheme(hoverCard, "hoverCard", { ui, size, transition }, className);

  const card = (
    <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
      <Ark.Content {...rest} data-slot="base" className={theme.class.base}>
        {arrow && (
          <Ark.Arrow data-slot="arrow" className={theme.class.arrow}>
            <Ark.ArrowTip data-slot="arrowTip" className={theme.class.arrowTip} />
          </Ark.Arrow>
        )}
        {title != null && (
          <div data-slot="title" className={theme.class.title}>
            {title}
          </div>
        )}
        {description != null && (
          <div data-slot="description" className={theme.class.description}>
            {description}
          </div>
        )}
        {body != null && (
          <div data-slot="body" className={theme.class.body}>
            {body}
          </div>
        )}
      </Ark.Content>
    </Ark.Positioner>
  );

  return (
    <Ark.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
      disabled={disabled}
      positioning={{ placement, offset: { mainAxis: offset } }}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
      ids={ids}
    >
      {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
      {portal ? <Portal>{card}</Portal> : card}
    </Ark.Root>
  );
}
