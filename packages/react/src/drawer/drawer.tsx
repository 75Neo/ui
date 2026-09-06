import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn, drawerDefaults, type DrawerRootProps as DrawerContract } from "@75neo/themes";
import { DrawerVariantsContext } from "./variants";
import { DrawerBackdrop } from "./backdrop";
import { DrawerBody } from "./body";
import { DrawerCloseTrigger } from "./close-trigger";
import { DrawerContent } from "./content";
import { DrawerDescription } from "./description";
import { DrawerFooter } from "./footer";
import { DrawerHeader } from "./header";
import { DrawerTitle } from "./title";

/**
 * Props for the Drawer.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute takes a
 * name, and `role` and `dir` because Ark and the locale provider own them.
 *
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 *
 * `children` is the trigger, not the body: the body is data, and the one element a
 * caller has to own is what opens the drawer.
 */
export interface DrawerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "role" | "dir" | "draggable">,
    Pick<React.ComponentProps<typeof Ark.Root>, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    DrawerContract<React.ReactNode> {
  /** The element that opens the drawer. It becomes the trigger. */
  children?: React.ReactNode;
}

export function Drawer({
  placement,
  size,
  transition,
  title,
  description,
  header,
  body,
  footer,
  overlay,
  dismissible,
  close,
  closeIcon,
  modal,
  portal,
  lazyMount,
  unmountOnExit,
  draggable,
  children,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: DrawerProps) {
  const resolved = {
    placement: placement ?? drawerDefaults.placement,
    size: size ?? drawerDefaults.size,
  };

  /*
   * Ark spells the two halves of dismissal separately, and a caller thinking about a
   * confirmation drawer is thinking about both at once, so one prop drives both. Left
   * `undefined` rather than `true` when it is on, so Ark's own defaults stand.
   */
  const dismiss = dismissible ? undefined : false;

  return (
    <DrawerVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        closeOnEscape={dismiss}
        closeOnInteractOutside={dismiss}
        modal={modal}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        ids={ids}
        data-slot="drawer"
        data-placement={resolved.placement}
        data-size={resolved.size}
      >
        {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
        {(overlay ?? true) && <DrawerBackdrop transition={transition} />}
        <DrawerContent
          portal={portal}
          draggable={draggable}
          transition={transition}
          className={className}
        >
          {header ?? (
            <DrawerHeader>
              <span data-slot="drawer-wrapper" className={cn("flex min-w-0 flex-1 flex-col gap-1")}>
                {title != null && <DrawerTitle>{title}</DrawerTitle>}
                {description != null && <DrawerDescription>{description}</DrawerDescription>}
              </span>
              {(close ?? true) && (
                <DrawerCloseTrigger aria-label="Close drawer">{closeIcon}</DrawerCloseTrigger>
              )}
            </DrawerHeader>
          )}
          {body != null && <DrawerBody>{body}</DrawerBody>}
          {footer != null && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Ark.Root>
    </DrawerVariantsContext.Provider>
  );
}
