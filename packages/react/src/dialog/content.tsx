import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  dialogDefaults,
  dialogSizeData,
  type DialogContentProps as DialogContentContract,
} from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogContent = cva("relative flex w-full flex-col overflow-hidden bg-default outline-none", {
  variants: {
    size: dialogSizeData.base,
    transition: {
      true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      false: "",
    },
    fullscreen: {
      true: "h-dvh max-h-dvh max-w-none rounded-none",
      false: "max-h-[calc(100dvh-2rem)] rounded-xl shadow-2xl ring ring-accented",
    },
  },
  defaultVariants: dialogDefaults,
});

export interface DialogContentProps
  extends React.ComponentProps<typeof Ark.Content>, DialogContentContract {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function DialogContent({
  transition,
  fullscreen,
  portal,
  className,
  children,
  ...rest
}: DialogContentProps) {
  const variants = useDialogVariants();
  const panel = (
    <Ark.Positioner
      data-slot="dialog-positioner"
      className={cn("fixed inset-0 flex items-center justify-center", fullscreen ? "p-0" : "p-4")}
    >
      <Ark.Content
        {...rest}
        data-slot="dialog-content"
        className={cn(dialogContent({ ...variants, transition, fullscreen }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
