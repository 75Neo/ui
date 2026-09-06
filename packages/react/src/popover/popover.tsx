import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { popoverDefaults, type PopoverRootProps as PopoverContract } from "@75neo/themes";
import { PopoverVariantsContext } from "./variants";
import { PopoverArrow } from "./arrow";
import { PopoverBody } from "./body";
import { PopoverCloseTrigger } from "./close-trigger";
import { PopoverContent } from "./content";
import { PopoverDescription } from "./description";
import { PopoverTitle } from "./title";

/**
 * Props for the Popover.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is the
 * wrong kind of title, and so is `content`. `dir` belongs to the locale provider.
 *
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 *
 * `children` is the trigger, not the body: the body is data, and the one element a
 * caller has to own is what opens the popover.
 */
export interface PopoverProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "content">,
    Pick<React.ComponentProps<typeof Ark.Root>, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    PopoverContract<React.ReactNode> {
  /** The element that opens the popover. It becomes the trigger. */
  children?: React.ReactNode;
}

export function Popover({
  size,
  title,
  description,
  body,
  arrow = false,
  placement = "bottom",
  offset = 8,
  dismissible,
  modal,
  close = false,
  closeIcon,
  autoFocus,
  portal,
  lazyMount,
  unmountOnExit,
  children,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: PopoverProps) {
  const resolved = {
    size: size ?? popoverDefaults.size,
    close,
  };

  /*
   * Ark spells the two halves of dismissal separately, and a caller is thinking
   * about dismissal as one thing. Left `undefined` rather than `true` when it is
   * on, so Ark's own defaults stand. The Dialog does the same.
   */
  const dismiss = dismissible ? undefined : false;

  return (
    <PopoverVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
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
        data-slot="popover"
        data-size={resolved.size}
      >
        {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
        <PopoverContent portal={portal} className={className}>
          {arrow && <PopoverArrow />}
          {title != null && <PopoverTitle>{title}</PopoverTitle>}
          {description != null && <PopoverDescription>{description}</PopoverDescription>}
          {body != null && <PopoverBody>{body}</PopoverBody>}
          {close && (
            <PopoverCloseTrigger aria-label="Close popover">{closeIcon}</PopoverCloseTrigger>
          )}
        </PopoverContent>
      </Ark.Root>
    </PopoverVariantsContext.Provider>
  );
}
