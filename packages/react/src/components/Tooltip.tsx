import type React from "react";
import { Portal } from "@ark-ui/react/portal";
import { Tooltip as Ark, type TooltipRootProps } from "@ark-ui/react/tooltip";
import { tooltip, type TooltipProps as TooltipContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Tooltip.
 *
 * @remarks
 * `content` is the bubble and `children` is what it explains. That is the same division
 * the Dialog makes and for the same reason: the trigger is the one part a caller has to
 * own, because it is their own element that has to carry Ark's props.
 *
 * The HTML attributes are the bubble's, so `title` is dropped — the global attribute is
 * the browser's own tooltip, and two tooltips on one element is not a thing worth
 * making possible.
 */
export interface TooltipProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "content">,
    Pick<TooltipRootProps, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    TooltipContract {
  /** The element the tooltip explains. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
  /** The bubble's content, for when a string is not enough. Falls back to `text`. */
  content?: React.ReactNode;
}

export function Tooltip({
  ui,
  size,
  transition,
  text,
  arrow = false,
  placement = "top",
  offset = 8,
  openDelay,
  closeDelay,
  interactive,
  disabled,
  portal = true,
  lazyMount,
  unmountOnExit,
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: TooltipProps) {
  const theme = useResolvedTheme(tooltip, "tooltip", { ui, size, transition }, className);

  const bubble = (
    <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
      <Ark.Content {...rest} data-slot="base" className={theme.class.base}>
        {arrow && (
          <Ark.Arrow data-slot="arrow" className={theme.class.arrow}>
            <Ark.ArrowTip data-slot="arrowTip" className={theme.class.arrowTip} />
          </Ark.Arrow>
        )}
        {content ?? text}
      </Ark.Content>
    </Ark.Positioner>
  );

  return (
    <Ark.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      interactive={interactive}
      disabled={disabled}
      positioning={{ placement, offset: { mainAxis: offset } }}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
      ids={ids}
    >
      {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
      {portal ? <Portal>{bubble}</Portal> : bubble}
    </Ark.Root>
  );
}
