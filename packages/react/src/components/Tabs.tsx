import type React from "react";
import { Tabs as Ark, type TabsRootProps } from "@ark-ui/react/tabs";
import { type TabsItem, type TabsProps as TabsContract, tabs } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Tabs.
 *
 * @remarks
 * Two HTML attributes are dropped: `defaultValue`, so Ark's own can take the name, and
 * `color`, where the legacy presentational attribute would collide with the variant.
 */
export interface TabsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<TabsRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    TabsContract<React.ReactNode> {
  /** Replace a tab's trigger text with arbitrary markup. Falls back to `item.label`. */
  renderLabel?: (item: TabsItem<React.ReactNode>) => React.ReactNode;
  /** Replace a tab's panel with arbitrary markup. Falls back to `item.content`. */
  renderContent?: (item: TabsItem<React.ReactNode>) => React.ReactNode;
}

export function Tabs({
  ui,
  variant,
  color,
  size,
  items,
  activationMode,
  orientation,
  unmountOnExit,
  lazyMount,
  renderLabel,
  renderContent,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: TabsProps) {
  const theme = useResolvedTheme(tabs, "tabs", { ui, variant, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      activationMode={activationMode}
      orientation={orientation}
      unmountOnExit={unmountOnExit}
      lazyMount={lazyMount}
      ids={ids}
    >
      <Ark.List data-slot="list" className={theme.class.list}>
        {items.map((item) => (
          <Ark.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            data-slot="trigger"
            className={theme.class.trigger}
          >
            {item.icon != null && (
              <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
                {item.icon}
              </span>
            )}
            <span data-slot="label" className={theme.class.label}>
              {renderLabel?.(item) ?? item.label}
            </span>
          </Ark.Trigger>
        ))}
        {/* Last, so it is measured against a list that has finished laying out. */}
        <Ark.Indicator data-slot="indicator" className={theme.class.indicator} />
      </Ark.List>

      {items.map((item) => (
        <Ark.Content
          key={item.value}
          value={item.value}
          data-slot="content"
          className={theme.class.content}
        >
          {renderContent?.(item) ?? item.content}
        </Ark.Content>
      ))}
    </Ark.Root>
  );
}
