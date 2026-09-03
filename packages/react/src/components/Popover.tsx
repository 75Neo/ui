import type React from "react";
import { Popover as Ark, type PopoverRootProps } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import { popover, type PopoverProps as PopoverContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Popover.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is the
 * browser's own tooltip where this component's is the panel's heading.
 *
 * `children` is the trigger, not the body. See the note on `PopoverProps` in
 * `@75neo/themes` for why the default slot is spent on the one element a caller has to
 * own.
 */
export interface PopoverProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "content">,
    Pick<PopoverRootProps, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    PopoverContract<React.ReactNode> {
  /** The element that opens the popover. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
  /** The panel's main content, under the title and description. */
  body?: React.ReactNode;
}

export function Popover({
  ui,
  size,
  transition,
  title,
  description,
  arrow = false,
  placement = "bottom",
  offset = 8,
  dismissible = true,
  modal,
  close = false,
  closeIcon,
  autoFocus,
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
}: PopoverProps) {
  const theme = useResolvedTheme(popover, "popover", { ui, size, close, transition }, className);

  /*
   * Ark spells the two halves of dismissal separately, and a caller is thinking about
   * both at once. Left `undefined` rather than `true` when it is on, so Ark's own
   * defaults stand. The Dialog does the same.
   */
  const dismiss = dismissible ? undefined : false;

  const panel = (
    <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
      <Ark.Content {...rest} data-slot="base" className={theme.class.base}>
        {arrow && (
          <Ark.Arrow data-slot="arrow" className={theme.class.arrow}>
            <Ark.ArrowTip data-slot="arrowTip" className={theme.class.arrowTip} />
          </Ark.Arrow>
        )}
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
        {body != null && (
          <div data-slot="body" className={theme.class.body}>
            {body}
          </div>
        )}
        {close && (
          <Ark.CloseTrigger data-slot="closeTrigger" className={theme.class.closeTrigger}>
            {closeIcon ?? <X />}
          </Ark.CloseTrigger>
        )}
      </Ark.Content>
    </Ark.Positioner>
  );

  return (
    <Ark.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      closeOnEscape={dismiss}
      closeOnInteractOutside={dismiss}
      modal={modal}
      autoFocus={autoFocus}
      positioning={{ placement, offset: { mainAxis: offset } }}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
      ids={ids}
    >
      {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
      {portal ? <Portal>{panel}</Portal> : panel}
    </Ark.Root>
  );
}
