import type { AccordionSlots, ClassValue } from "@75neo/styles";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useComponentTheme } from "../theme";

/**
 * One row of the accordion. Extra keys are allowed, so a list that already exists in the
 * shape some API returns it can be passed straight in and read through `labelKey` and
 * `valueKey`.
 */
export interface AccordionItem {
  /** The trigger's text. */
  label?: string;
  /** Rendered before the label — a Lucide icon, or any component taking no props. */
  icon?: LucideIcon | ComponentType;
  /** Replaces the chevron, for this row alone. */
  trailingIcon?: LucideIcon | ComponentType;
  /**
   * Names this row's own slots in `slots`: `{slot}` replaces its whole panel,
   * `{slot}-body` only what sits inside it. Without one, `content` and `body` are used.
   */
  slot?: string;
  /** The panel's text, for a row that needs no markup of its own. */
  content?: ReactNode;
  /**
   * The row's value, which is also its key. Defaults to the index — give it something
   * stable if rows are added, removed or reordered, so open panels stay open.
   */
  value?: string;
  disabled?: boolean;
  /** Merged into this row's `item` class. */
  className?: ClassValue;
  /** Per-slot overrides for this row only, merged over the accordion's own `ui`. */
  ui?: AccordionSlots;
  [key: string]: unknown;
}

/** What every slot is handed. */
export interface AccordionSlotProps {
  item: AccordionItem;
  index: number;
  /** Whether this row is expanded. */
  open: boolean;
}

/** A slot: Vue and Svelte spell this as a named slot, React as a render prop. */
export type AccordionSlot = (props: AccordionSlotProps) => ReactNode;

export interface AccordionProps
  // `content` is omitted because React types it as the HTML attribute of that name; here
  // it is the panel's render prop.
  extends Omit<Ark.RootProps, "children" | "className" | "content"> {
  /** The rows. */
  items?: AccordionItem[];
  /** The chevron every row's trigger ends with. */
  trailingIcon?: LucideIcon | ComponentType;
  /** Which key of an item holds its label. */
  labelKey?: string;
  /** Which key of an item holds its value. */
  valueKey?: string;
  className?: ClassValue;
  /**
   * Per-slot class overrides for the whole accordion — `{ trigger: "text-lg" }` reaches
   * every row.
   */
  ui?: AccordionSlots;
  /** The trigger's label. Vue's and Svelte's default slot. */
  children?: AccordionSlot;
  /** Before the label. Renders the row's `icon` by default. */
  leading?: AccordionSlot;
  /** After the label. Renders the chevron by default. */
  trailing?: AccordionSlot;
  /** The whole panel, padding included. */
  content?: AccordionSlot;
  /** What sits inside the panel's padding. Renders the row's `content` by default. */
  body?: AccordionSlot;
  /** The per-row slots named by `item.slot`, keyed by that name. */
  slots?: Record<string, AccordionSlot>;
}

/**
 * The whole accordion, driven by `items` — Ark's five parts are an implementation detail
 * rather than the API, and every part a caller might want to replace is a render prop.
 *
 * Ark's own root props (`multiple`, `collapsible`, `defaultValue`, `unmountOnExit`, …)
 * are accepted unchanged, so [its documentation](https://ark-ui.com/docs/components/accordion)
 * applies.
 */
export const Accordion = ({
  items = [],
  trailingIcon: TrailingIcon = ChevronDownIcon,
  labelKey = "label",
  valueKey = "value",
  disabled = undefined,
  className,
  ui,
  children,
  leading,
  trailing,
  content,
  body,
  slots: itemSlots,
  ...rest
}: AccordionProps) => {
  const theme = useComponentTheme("accordion");
  const styles = theme({ disabled });

  const contentSlot = (item: AccordionItem) => itemSlots?.[item.slot ?? ""] ?? content;
  const bodySlot = (item: AccordionItem) => itemSlots?.[`${item.slot}-body`] ?? body;

  return (
    <Ark.Root
      className={styles.root({ class: [ui?.root, className] })}
      disabled={disabled}
      {...rest}
    >
      {items.map((item, index) => {
        const value = String(item[valueKey] ?? index);
        const label = item[labelKey] as ReactNode;
        const Icon = item.icon;
        const ItemTrailingIcon = item.trailingIcon ?? TrailingIcon;
        // A row with nothing to show gets no panel at all, rather than an empty
        // animated box.
        const hasContent = Boolean(item.content ?? contentSlot(item) ?? bodySlot(item));

        return (
          <Ark.Item
            key={value}
            value={value}
            disabled={item.disabled}
            className={styles.item({ class: [ui?.item, item.ui?.item, item.className] })}
          >
            <Ark.ItemContext>
              {({ expanded }) => {
                const slotProps = { item, index, open: expanded };

                return (
                  <>
                    <Ark.ItemTrigger
                      className={styles.trigger({
                        // Per row, not per accordion: one disabled row dims its own
                        // trigger without the rest of the list following.
                        disabled: item.disabled ?? disabled,
                        class: [ui?.trigger, item.ui?.trigger],
                      })}
                    >
                      {leading?.(slotProps) ??
                        (Icon ? (
                          <Icon
                            className={styles.leadingIcon({
                              class: [ui?.leadingIcon, item.ui?.leadingIcon],
                            })}
                            aria-hidden="true"
                            focusable="false"
                          />
                        ) : null)}

                      <span className={styles.label({ class: [ui?.label, item.ui?.label] })}>
                        {children?.(slotProps) ?? label}
                      </span>

                      {trailing?.(slotProps) ?? (
                        <ItemTrailingIcon
                          className={styles.trailingIcon({
                            class: [ui?.trailingIcon, item.ui?.trailingIcon],
                          })}
                          aria-hidden="true"
                          focusable="false"
                        />
                      )}
                    </Ark.ItemTrigger>

                    {hasContent && (
                      <Ark.ItemContent
                        className={styles.content({ class: [ui?.content, item.ui?.content] })}
                      >
                        {contentSlot(item)?.(slotProps) ?? (
                          <div className={styles.body({ class: [ui?.body, item.ui?.body] })}>
                            {bodySlot(item)?.(slotProps) ?? item.content}
                          </div>
                        )}
                      </Ark.ItemContent>
                    )}
                  </>
                );
              }}
            </Ark.ItemContext>
          </Ark.Item>
        );
      })}
    </Ark.Root>
  );
};

Accordion.displayName = "Accordion";
