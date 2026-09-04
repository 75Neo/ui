import type React from "react";
import {
  Toaster as ArkToaster,
  Toast as ArkToast,
  type CreateToasterReturn,
} from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { CircleAlert, CircleCheck, Info, LoaderCircle, TriangleAlert, X } from "lucide-react";
import { toast, type ToastProps as ToastContract, type ToastType } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

const defaultIcons: Record<ToastType, React.ReactNode> = {
  success: <CircleCheck />,
  error: <CircleAlert />,
  warning: <TriangleAlert />,
  info: <Info />,
  loading: <LoaderCircle />,
};

/**
 * Props for the Toast region.
 */
export interface ToastProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir" | "color">,
    ToastContract<React.ReactNode> {
  /** The toast store driving this region, created with `createToaster`. */
  toaster: CreateToasterReturn<any>;
}

export function Toast({
  ui,
  color,
  size,
  placement,
  closeIcon,
  icons,
  portal = true,
  toaster,
  className,
  ...rest
}: ToastProps) {
  const theme = useResolvedTheme(toast, "toast", { ui, color, size, placement }, className);

  const content = (
    <ArkToaster toaster={toaster} data-slot="group" className={theme.class.group} {...rest}>
      {(t) => {
        const type = t.type as ToastType | undefined;
        const icon = (type && (icons?.[type] ?? defaultIcons[type])) ?? null;

        return (
          <ArkToast.Root key={t.id} data-slot="base" className={theme.class.base}>
            {(t.title != null || icon != null) && (
              <ArkToast.Title data-slot="title" className={theme.class.title}>
                {icon && (
                  <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
                    {icon}
                  </span>
                )}
                {t.title}
              </ArkToast.Title>
            )}
            {t.description != null && (
              <ArkToast.Description data-slot="description" className={theme.class.description}>
                {t.description}
              </ArkToast.Description>
            )}
            {t.action && (
              <ArkToast.ActionTrigger
                data-slot="actionTrigger"
                className={theme.class.actionTrigger}
              >
                {t.action.label}
              </ArkToast.ActionTrigger>
            )}
            {t.closable !== false && (
              <ArkToast.CloseTrigger
                data-slot="closeTrigger"
                className={theme.class.closeTrigger}
                aria-label="Close"
              >
                {closeIcon ?? <X />}
              </ArkToast.CloseTrigger>
            )}
          </ArkToast.Root>
        );
      }}
    </ArkToaster>
  );

  return portal ? <Portal>{content}</Portal> : content;
}
