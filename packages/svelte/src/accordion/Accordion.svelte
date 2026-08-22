<script lang="ts">
  import type { AccordionSlots, AccordionVariants } from "@75neo/styles";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  // Imported per icon rather than from the barrel, which Lucide recommends so Vite's
  // dev server does not have to process the whole set.
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import type { Component, Snippet } from "svelte";
  import { useComponentTheme } from "../theme";

  /**
   * Any component that renders an icon — a Lucide one, or your own.
   *
   * Typed by the two attributes this component hands it rather than by the whole of
   * `SVGAttributes`: several of those are `string | null` where Lucide's own props are
   * `string`, and a component's props are checked contravariantly, so the wider type
   * would make every Lucide icon unassignable.
   */
  export type IconComponent = Component<{ "aria-hidden"?: "true"; focusable?: "false" }>;

  /**
   * One row of the accordion. Extra keys are allowed, so a list that already exists in
   * the shape some API returns it can be passed straight in and read through `labelKey`
   * and `valueKey`.
   */
  export interface AccordionItem {
    /** The trigger's text. */
    label?: string;
    /** Rendered before the label. */
    icon?: IconComponent;
    /** Replaces the chevron, for this row alone. */
    trailingIcon?: IconComponent;
    /**
     * Names this row's own snippets in `slots`: `{slot}` replaces its whole panel,
     * `{slot}-body` only what sits inside it. Without one, `content` and `body` are used.
     */
    slot?: string;
    /** The panel's text, for a row that needs no markup of its own. */
    content?: string;
    /**
     * The row's value, which is also its key. Defaults to the index — give it something
     * stable if rows are added, removed or reordered, so open panels stay open.
     */
    value?: string;
    disabled?: boolean;
    /** Merged into this row's `item` class. */
    class?: string;
    /** Per-slot overrides for this row only, merged over the accordion's own `ui`. */
    ui?: AccordionSlots;
    [key: string]: unknown;
  }

  /** What every snippet is handed. */
  export interface AccordionSlotProps {
    item: AccordionItem;
    index: number;
    /** Whether this row is expanded. */
    open: boolean;
  }

  /** A slot: Vue spells this as a named slot, React as a render prop. */
  export type AccordionSlot = Snippet<[AccordionSlotProps]>;

  // `class` is narrowed to a string so the theme's slot function can merge it.
  export type AccordionProps = Omit<Ark.RootProps, "class" | "children"> &
    AccordionVariants & {
      /** The rows. */
      items?: AccordionItem[];
      /** The chevron every row's trigger ends with. */
      trailingIcon?: IconComponent;
      /** Which key of an item holds its label. */
      labelKey?: string;
      /** Which key of an item holds its value. */
      valueKey?: string;
      class?: string;
      /**
       * Per-slot class overrides for the whole accordion — `{ trigger: "text-lg" }`
       * reaches every row.
       */
      ui?: AccordionSlots;
      /** The trigger's label. */
      children?: AccordionSlot;
      /** Before the label. Renders the row's `icon` by default. */
      leading?: AccordionSlot;
      /** After the label. Renders the chevron by default. */
      trailing?: AccordionSlot;
      /** The whole panel, padding included. */
      content?: AccordionSlot;
      /** What sits inside the panel's padding. Renders the row's `content` by default. */
      body?: AccordionSlot;
      /** The per-row snippets named by `item.slot`, keyed by that name. */
      slots?: Record<string, AccordionSlot>;
    };

  let {
    items = [],
    trailingIcon = ChevronDownIcon,
    labelKey = "label",
    valueKey = "value",
    variant,
    size,
    colorPalette,
    class: className,
    ui,
    children,
    leading,
    trailing,
    content,
    body,
    slots,
    ...rest
  }: AccordionProps = $props();

  const theme = useComponentTheme("accordion");
  const styles = $derived(theme()({ variant, size, colorPalette }));

  const valueOf = (item: AccordionItem, index: number) => String(item[valueKey] ?? index);
  const labelOf = (item: AccordionItem) => item[labelKey] as string | undefined;

  const contentSlot = (item: AccordionItem) => slots?.[item.slot ?? ""] ?? content;
  const bodySlot = (item: AccordionItem) => slots?.[`${item.slot}-body`] ?? body;

  /** A row with nothing to show gets no panel at all, rather than an empty animated box. */
  const hasContent = (item: AccordionItem) =>
    Boolean(item.content) || Boolean(contentSlot(item)) || Boolean(bodySlot(item));
</script>

<!--
  The whole accordion, driven by `items` — Ark's five parts are an implementation detail
  rather than the API, and every part a caller might want to replace is a snippet.

  Ark's own root props (`multiple`, `collapsible`, `defaultValue`, …) are accepted
  unchanged, so its documentation applies: https://ark-ui.com/docs/components/accordion
-->
<Ark.Root class={styles.root({ class: [ui?.root, className] })} {...rest}>
  {#each items as item, index (valueOf(item, index))}
    <Ark.Item
      value={valueOf(item, index)}
      disabled={item.disabled}
      class={styles.item({ class: [ui?.item, item.ui?.item, item.class] })}
    >
      <Ark.ItemContext>
        {#snippet render(itemState)}
          {@const slotProps = { item, index, open: itemState().expanded }}

          <Ark.ItemTrigger class={styles.trigger({ class: [ui?.trigger, item.ui?.trigger] })}>
            {#if leading}
              {@render leading(slotProps)}
            {:else if item.icon}
              {@const Icon = item.icon}
              <span
                class={styles.leadingIcon({ class: [ui?.leadingIcon, item.ui?.leadingIcon] })}
              >
                <Icon aria-hidden="true" focusable="false" />
              </span>
            {/if}

            <span class={styles.label({ class: [ui?.label, item.ui?.label] })}>
              {#if children}
                {@render children(slotProps)}
              {:else}
                {labelOf(item)}
              {/if}
            </span>

            {#if trailing}
              {@render trailing(slotProps)}
            {:else}
              {@const TrailingIcon = item.trailingIcon ?? trailingIcon}
              <Ark.ItemIndicator
                class={styles.trailingIcon({ class: [ui?.trailingIcon, item.ui?.trailingIcon] })}
              >
                <TrailingIcon aria-hidden="true" focusable="false" />
              </Ark.ItemIndicator>
            {/if}
          </Ark.ItemTrigger>

          {#if hasContent(item)}
            <Ark.ItemContent class={styles.content({ class: [ui?.content, item.ui?.content] })}>
              {#if contentSlot(item)}
                {@render contentSlot(item)?.(slotProps)}
              {:else}
                <div class={styles.body({ class: [ui?.body, item.ui?.body] })}>
                  {#if bodySlot(item)}
                    {@render bodySlot(item)?.(slotProps)}
                  {:else}
                    {item.content}
                  {/if}
                </div>
              {/if}
            </Ark.ItemContent>
          {/if}
        {/snippet}
      </Ark.ItemContext>
    </Ark.Item>
  {/each}
</Ark.Root>
