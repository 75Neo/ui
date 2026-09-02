import type React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import {
  type AccordionItem,
  type AccordionProps as AccordionContract,
  accordion,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

export interface AccordionProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir">,
    AccordionContract<React.ReactNode> {
  /** Replace an item's heading with arbitrary markup. Falls back to `item.label`. */
  renderLabel?: (item: AccordionItem<React.ReactNode>) => React.ReactNode;
  /** Replace an item's body with arbitrary markup. Falls back to `item.content`. */
  renderContent?: (item: AccordionItem<React.ReactNode>) => React.ReactNode;
}

export function Accordion({
  ui,
  variant,
  size,
  items,
  multiple,
  collapsible,
  disabled,
  orientation,
  trailingIcon,
  renderLabel,
  renderContent,
  className,
  ...rest
}: AccordionProps) {
  const theme = useResolvedTheme(accordion, "accordion", { ui, variant, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      multiple={multiple}
      collapsible={collapsible}
      disabled={disabled}
      orientation={orientation}
    >
      {items.map((item) => (
        <Ark.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          data-slot="item"
          className={theme.class.item}
        >
          <h3 data-slot="header" className={theme.class.header}>
            <Ark.ItemTrigger data-slot="trigger" className={theme.class.trigger}>
              {item.icon != null && (
                <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
                  {item.icon}
                </span>
              )}
              <span data-slot="label" className={theme.class.label}>
                {renderLabel?.(item) ?? item.label}
              </span>
              <Ark.ItemIndicator data-slot="trailingIcon" className={theme.class.trailingIcon}>
                {trailingIcon ?? <ChevronDown />}
              </Ark.ItemIndicator>
            </Ark.ItemTrigger>
          </h3>
          <Ark.ItemContent data-slot="content" className={theme.class.content}>
            <div data-slot="body" className={theme.class.body}>
              {renderContent?.(item) ?? item.content}
            </div>
          </Ark.ItemContent>
        </Ark.Item>
      ))}
    </Ark.Root>
  );
}
