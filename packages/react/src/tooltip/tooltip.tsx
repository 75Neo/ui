import type React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { tooltipDefaults, type TooltipRootProps as TooltipContract } from "@75neo/themes";
import { TooltipVariantsContext } from "./variants";
import { TooltipArrow } from "./arrow";
import { TooltipContent } from "./content";
import { TooltipTrigger } from "./trigger";

/**
 * Props for the Tooltip.
 *
 * @remarks
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type. `children` is the trigger.
 */
export interface TooltipProps
  extends
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "open" | "defaultOpen" | "onOpenChange" | "ids" | "closeOnClick" | "closeOnEscape"
    >,
    TooltipContract {
  /** Render the bubble at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Reaches the bubble, which is the part a call site is naming. */
  className?: string;
  /** The element the bubble explains. It becomes the trigger. */
  children?: React.ReactNode;
}

export function Tooltip({
  size,
  text,
  arrow,
  placement,
  offset,
  openDelay,
  closeDelay,
  interactive,
  disabled,
  lazyMount,
  unmountOnExit,
  portal,
  open,
  defaultOpen,
  onOpenChange,
  closeOnClick,
  closeOnEscape,
  ids,
  className,
  children,
}: TooltipProps) {
  const resolved = { size: size ?? tooltipDefaults.size };

  return (
    <TooltipVariantsContext.Provider value={resolved}>
      <Ark.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        openDelay={openDelay}
        closeDelay={closeDelay}
        interactive={interactive}
        disabled={disabled}
        closeOnClick={closeOnClick}
        closeOnEscape={closeOnEscape}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        positioning={{ placement: placement ?? "top", offset: { mainAxis: offset ?? 8 } }}
        ids={ids}
      >
        {children != null && <TooltipTrigger>{children}</TooltipTrigger>}
        {text != null && (
          <TooltipContent portal={portal} className={className}>
            {(arrow ?? false) && <TooltipArrow />}
            {text}
          </TooltipContent>
        )}
      </Ark.Root>
    </TooltipVariantsContext.Provider>
  );
}
