import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn, dialogDefaults, type DialogRootProps as DialogContract } from "@75neo/themes";
import { DialogVariantsContext } from "./variants";
import { DialogBackdrop } from "./backdrop";
import { DialogBody } from "./body";
import { DialogCloseTrigger } from "./close-trigger";
import { DialogContent } from "./content";
import { DialogDescription } from "./description";
import { DialogFooter } from "./footer";
import { DialogHeader } from "./header";
import { DialogTitle } from "./title";

/**
 * Props for the Dialog.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute takes a
 * name, and `role` and `dir` because Ark and the locale provider own them.
 *
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 *
 * `children` is the trigger, not the body: the body is data, and the one element a
 * caller has to own is what opens the dialog.
 */
export interface DialogProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "role" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    DialogContract<React.ReactNode> {
  /** The element that opens the dialog. It becomes the trigger. */
  children?: React.ReactNode;
}

export function Dialog({
  size,
  transition,
  fullscreen,
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
  role,
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
}: DialogProps) {
  const resolved = { size: size ?? dialogDefaults.size };

  /*
   * Ark spells the two halves of dismissal separately, and a caller thinking about a
   * confirmation dialog is thinking about both at once, so one prop drives both. Left
   * `undefined` rather than `true` when it is on, so Ark's own defaults stand.
   */
  const dismiss = dismissible ? undefined : false;

  return (
    <DialogVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        closeOnEscape={dismiss}
        closeOnInteractOutside={dismiss}
        modal={modal}
        role={role}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        ids={ids}
        data-slot="dialog"
        data-size={resolved.size}
      >
        {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
        {(overlay ?? true) && <DialogBackdrop transition={transition} />}
        <DialogContent
          portal={portal}
          transition={transition}
          fullscreen={fullscreen}
          className={className}
        >
          {header ?? (
            <DialogHeader>
              <span data-slot="dialog-wrapper" className={cn("flex min-w-0 flex-1 flex-col gap-1")}>
                {title != null && <DialogTitle>{title}</DialogTitle>}
                {description != null && <DialogDescription>{description}</DialogDescription>}
              </span>
              {(close ?? true) && (
                <DialogCloseTrigger aria-label="Close dialog">{closeIcon}</DialogCloseTrigger>
              )}
            </DialogHeader>
          )}
          {body != null && <DialogBody>{body}</DialogBody>}
          {footer != null && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Ark.Root>
    </DialogVariantsContext.Provider>
  );
}
