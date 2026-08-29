import * as React from "react";
import { Accordion as ArkAccordion } from "@ark-ui/react/accordion";
import { accordion, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../hooks/useComponentUI";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type AccordionItem = {
  label?: string;
  content?: string;
  value?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  ui?: Partial<
    Record<
      "item" | "header" | "trigger" | "leadingIcon" | "label" | "trailingIcon" | "content" | "body",
      SlotClass
    >
  >;
};

export type AccordionUI = {
  root?: SlotClass;
  item?: SlotClass;
  header?: SlotClass;
  trigger?: SlotClass;
  content?: SlotClass;
  body?: SlotClass;
  leadingIcon?: SlotClass;
  trailingIcon?: SlotClass;
  label?: SlotClass;
};

export type AccordionProps = Omit<
  React.ComponentProps<typeof ArkAccordion.Root>,
  "value" | "defaultValue" | "children"
> & {
  items?: AccordionItem[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  disabled?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  trailingIcon?: React.ReactNode;
  valueKey?: string;
  labelKey?: string;
  ui?: AccordionUI;
  children?: React.ReactNode;
};

function getValue(item: AccordionItem, index: number, valueKey: string): string {
  const record = item as unknown as Record<string, unknown>;
  const keyedValue = record[valueKey];
  if (typeof keyedValue === "string" && keyedValue.length > 0) return keyedValue;
  if (typeof item.value === "string" && item.value.length > 0) return item.value;
  return String(index);
}

function getLabel(item: AccordionItem, labelKey: string): string {
  const record = item as unknown as Record<string, unknown>;
  const keyedLabel = record[labelKey];
  if (typeof keyedLabel === "string") return keyedLabel;
  return item.label ?? "";
}

function applySlotClass(base: string, slotClass?: SlotClass): string {
  if (!slotClass) return base;
  if (typeof slotClass === "function") return slotClass(base);
  return twMerge(base, slotClass);
}

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
      trailingIcon,
      valueKey = "value",
      labelKey = "label",
      children,
      ...props
    },
    ref,
  ) => {
    const tvSlots = React.useMemo(() => accordion({ disabled }), [disabled]);
    const resolved = useComponentUI("accordion", tvSlots, ui);

    const multiple = type === "multiple";

    const arkDefaultValue = React.useMemo(() => {
      if (defaultValue == null) return undefined;
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }, [defaultValue]);

    const arkValue = React.useMemo(() => {
      if (value == null) return undefined;
      return Array.isArray(value) ? value : [value];
    }, [value]);

    if (items?.length) {
      return (
        <ArkAccordion.Root
          ref={ref}
          multiple={multiple}
          collapsible={collapsible}
          disabled={disabled}
          defaultValue={arkDefaultValue}
          value={arkValue}
          className={resolved.root()}
          data-slot="root"
          {...props}
        >
          {items.map((item, index) => {
            const v = getValue(item, index, valueKey);
            const label = getLabel(item, labelKey);

            const itemClass = applySlotClass(resolved.item(), item.ui?.item);
            const triggerClass = applySlotClass(resolved.trigger(), item.ui?.trigger);
            const leadingClass = applySlotClass(resolved.leadingIcon(), item.ui?.leadingIcon);
            const labelClass = applySlotClass(resolved.label(), item.ui?.label);
            const trailingClass = applySlotClass(resolved.trailingIcon(), item.ui?.trailingIcon);
            const contentClass = applySlotClass(resolved.content(), item.ui?.content);
            const bodyClass = applySlotClass(resolved.body(), item.ui?.body);
            const headerClass = applySlotClass(resolved.header(), item.ui?.header);

            return (
              <ArkAccordion.Item
                key={v}
                value={v}
                disabled={item.disabled || disabled}
                className={itemClass}
                data-slot="item"
              >
                <div data-slot="header" className={headerClass}>
                  <ArkAccordion.ItemTrigger data-slot="trigger" className={triggerClass}>
                    {item.icon && (
                      <span data-slot="leadingIcon" className={leadingClass}>
                        {item.icon}
                      </span>
                    )}
                    <span data-slot="label" className={labelClass}>
                      {label}
                    </span>
                    <ArkAccordion.ItemIndicator data-slot="trailingIcon" className={trailingClass}>
                      {item.trailingIcon ?? trailingIcon ?? <ChevronDown />}
                    </ArkAccordion.ItemIndicator>
                  </ArkAccordion.ItemTrigger>
                </div>
                <ArkAccordion.ItemContent data-slot="content" className={contentClass}>
                  <div data-slot="body" className={bodyClass}>
                    {item.content}
                  </div>
                </ArkAccordion.ItemContent>
              </ArkAccordion.Item>
            );
          })}
        </ArkAccordion.Root>
      );
    }

    return (
      <ArkAccordion.Root
        ref={ref}
        multiple={multiple}
        collapsible={collapsible}
        disabled={disabled}
        defaultValue={arkDefaultValue}
        value={arkValue}
        className={resolved.root()}
        data-slot="root"
        {...props}
      >
        {children}
      </ArkAccordion.Root>
    );
  },
);
Accordion.displayName = "Accordion";
