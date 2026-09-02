import type React from "react";
import { Collapsible as Ark, type CollapsibleRootProps } from "@ark-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { type CollapsibleProps as CollapsibleContract, collapsible } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Collapsible.
 *
 * @remarks
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type. `children` is the panel's content.
 */
export interface CollapsibleProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Pick<CollapsibleRootProps, "open" | "defaultOpen" | "onOpenChange" | "onExitComplete" | "ids">,
    CollapsibleContract<React.ReactNode> {
  /** Replaces the trigger's contents with arbitrary markup. Falls back to `label`. */
  renderLabel?: () => React.ReactNode;
}

export function Collapsible({
  ui,
  variant,
  size,
  label,
  icon,
  trailingIcon,
  disabled,
  collapsedHeight,
  unmountOnExit,
  lazyMount,
  open,
  defaultOpen,
  onOpenChange,
  onExitComplete,
  ids,
  renderLabel,
  className,
  children,
  ...rest
}: CollapsibleProps) {
  const theme = useResolvedTheme(collapsible, "collapsible", { ui, variant, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      onExitComplete={onExitComplete}
      disabled={disabled}
      collapsedHeight={collapsedHeight}
      unmountOnExit={unmountOnExit}
      lazyMount={lazyMount}
      ids={ids}
    >
      <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
        {icon != null && (
          <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
            {icon}
          </span>
        )}
        <span data-slot="label" className={theme.class.label}>
          {renderLabel?.() ?? label}
        </span>
        <Ark.Indicator data-slot="trailingIcon" className={theme.class.trailingIcon}>
          {trailingIcon ?? <ChevronDown />}
        </Ark.Indicator>
      </Ark.Trigger>

      <Ark.Content data-slot="content" className={theme.class.content}>
        <div data-slot="body" className={theme.class.body}>
          {children}
        </div>
      </Ark.Content>
    </Ark.Root>
  );
}
