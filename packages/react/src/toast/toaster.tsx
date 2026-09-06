import type React from "react";
import {
  Toaster as ArkToaster,
  createToaster,
  type CreateToasterReturn,
} from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { cn, toastDefaults, type ToasterProps as ToasterContract } from "@75neo/themes";
import { ToastVariantsContext } from "./variants";
import { ToastActionTrigger } from "./action-trigger";
import { ToastCloseTrigger } from "./close-trigger";
import { ToastDescription } from "./description";
import { ToastRoot } from "./root";
import { ToastTitle } from "./title";

/**
 * Props for the Toaster.
 *
 * @remarks
 * Placement, gap, duration and the rest of the stacking behaviour belong to the
 * store options in `createToaster`, not to this component: the toaster renders
 * what the store holds. Each toast's title, description and action come from the
 * toast object itself, the way the tour's steps carry their own copy.
 */
export interface ToasterProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    ToasterContract<React.ReactNode, CreateToasterReturn> {}

export function Toaster({
  size,
  toaster,
  close,
  closeIcon,
  portal,
  className,
  ...rest
}: ToasterProps) {
  const resolved = { size: size ?? toastDefaults.size };
  const stack = (
    <ArkToaster
      {...rest}
      toaster={toaster}
      data-slot="toast-toaster"
      data-size={resolved.size}
      className={cn("z-50", className)}
    >
      {(toast) => (
        <ToastRoot key={toast.id}>
          {toast.title != null && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description != null && <ToastDescription>{toast.description}</ToastDescription>}
          {toast.action != null && (
            <ToastActionTrigger onClick={toast.action.onClick}>
              {toast.action.label}
            </ToastActionTrigger>
          )}
          {(close ?? true) && (
            <ToastCloseTrigger aria-label="Close toast">{closeIcon}</ToastCloseTrigger>
          )}
        </ToastRoot>
      )}
    </ArkToaster>
  );

  return (
    <ToastVariantsContext.Provider value={resolved}>
      {(portal ?? true) ? <Portal>{stack}</Portal> : stack}
    </ToastVariantsContext.Provider>
  );
}

export { createToaster };
export type { CreateToasterReturn };
