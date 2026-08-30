import * as React from "react";
import { Accordion as ArkAccordion } from "@ark-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { accordion } from "@75neo/styles";
import {
  accordionKey,
  applySlotClass,
  resolveAccordionValue,
  toValueArray,
  type AccordionItemData,
  type AccordionUI,
} from "@75neo/core";
import { useComponentUI } from "../hooks/useComponentUI";
import { renderSlot, type Slot } from "../utils/renderSlot";

export type AccordionItem = AccordionItemData<React.ReactNode>;

/** Scope handed to every per-item slot, matching Vue's `{ item, index }`. */
export type AccordionSlotBag = { item: AccordionItem; index: number };

export type AccordionProps = Omit<
  React.ComponentProps<typeof ArkAccordion.Root>,
  "value" | "defaultValue" | "children" | "multiple" | "content" | "label"
> & {
  items?: AccordionItem[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  disabled?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  ui?: AccordionUI;
  /** Mirrors Vue's `#leading` slot; falls back to `item.leading`. */
  leading?: Slot<AccordionSlotBag>;
  /** Mirrors Vue's `#label` slot; falls back to `item.label`. */
  label?: Slot<AccordionSlotBag>;
  /** Mirrors Vue's `#trailing` slot; falls back to `item.trailing`, then a chevron. */
  trailing?: Slot<AccordionSlotBag>;
  /** Mirrors Vue's `#content` slot; falls back to `item.content`. */
  content?: Slot<AccordionSlotBag>;
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      ui,
      items,
      type = "single",
      collapsible = true,
      disabled = false,
      defaultValue,
      value,
      leading,
      label,
      trailing,
      content,
      className,
      ...props
    },
    ref,
  ) => {
    const tvSlots = React.useMemo(() => accordion({ disabled }), [disabled]);
    const resolved = useComponentUI(accordionKey, tvSlots, ui);

    return (
      <ArkAccordion.Root
        ref={ref}
        multiple={type === "multiple"}
        collapsible={collapsible}
        disabled={disabled}
        defaultValue={toValueArray(defaultValue)}
        value={toValueArray(value)}
        className={resolved.root({ className })}
        data-slot="root"
        {...props}
      >
        {items?.map((item, index) => {
          const bag: AccordionSlotBag = { item, index };
          const itemValue = resolveAccordionValue(item, index);
          const hasLeading = leading != null || item.leading != null;

          return (
            <ArkAccordion.Item
              key={itemValue}
              value={itemValue}
              disabled={item.disabled || disabled}
              data-slot="item"
              className={applySlotClass(resolved.item(), item.ui?.item)}
            >
              <div
                data-slot="header"
                className={applySlotClass(resolved.header(), item.ui?.header)}
              >
                <ArkAccordion.ItemTrigger
                  data-slot="trigger"
                  className={applySlotClass(resolved.trigger(), item.ui?.trigger)}
                >
                  {hasLeading && (
                    <span
                      data-slot="leading"
                      className={applySlotClass(resolved.leading(), item.ui?.leading)}
                    >
                      {renderSlot(leading, bag, item.leading)}
                    </span>
                  )}
                  <span
                    data-slot="label"
                    className={applySlotClass(resolved.label(), item.ui?.label)}
                  >
                    {renderSlot(label, bag, item.label)}
                  </span>
                  <ArkAccordion.ItemIndicator
                    data-slot="trailing"
                    className={applySlotClass(resolved.trailing(), item.ui?.trailing)}
                  >
                    {renderSlot(trailing, bag, item.trailing ?? <ChevronDown />)}
                  </ArkAccordion.ItemIndicator>
                </ArkAccordion.ItemTrigger>
              </div>
              <ArkAccordion.ItemContent
                data-slot="content"
                className={applySlotClass(resolved.content(), item.ui?.content)}
              >
                <div data-slot="body" className={applySlotClass(resolved.body(), item.ui?.body)}>
                  {renderSlot(content, bag, item.content)}
                </div>
              </ArkAccordion.ItemContent>
            </ArkAccordion.Item>
          );
        })}
      </ArkAccordion.Root>
    );
  },
);
Accordion.displayName = "Accordion";
