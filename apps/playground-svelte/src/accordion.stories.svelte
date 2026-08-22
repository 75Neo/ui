<script module lang="ts">
  import { Accordion, type AccordionItem, NeoUIProvider, type ThemeConfig } from "@75neo/svelte";
  import LeafIcon from "@lucide/svelte/icons/leaf";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import ShapesIcon from "@lucide/svelte/icons/shapes";
  import SunMoonIcon from "@lucide/svelte/icons/sun-moon";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const VARIANTS = ["outline", "subtle", "elevated", "plain"] as const;
  const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
  const SIZES = ["sm", "md", "lg"] as const;

  const items: AccordionItem[] = [
    {
      value: "recipes",
      label: "Where does styling live?",
      icon: LeafIcon,
      content:
        "In one tailwind-variants theme under packages/styles. React, Vue and Svelte all render the class names it produces, so a variant is added once rather than three times.",
    },
    {
      value: "intents",
      label: "How are shape and intent kept apart?",
      icon: ShapesIcon,
      content:
        "Every intent palette fills the same eight roles, so a theme writes each shape once against the intent-* roles and gets all six intents for free.",
    },
    {
      value: "modes",
      label: "What happens in dark mode?",
      icon: SunMoonIcon,
      content:
        "Components style against semantic utilities such as bg-surface and text-fg-muted, which resolve per colour mode. Nothing inside a component ever branches on dark: itself.",
    },
  ];

  const grid = "grid gap-6";
  const row = "grid gap-2";
  const frame = "max-w-lg";
  const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

  const flatTheme: ThemeConfig = {
    accordion: {
      slots: { trigger: "font-semibold" },
      defaultVariants: { variant: "plain", colorPalette: "info" },
    },
  };

  const { Story } = defineMeta({
    title: "Components/Accordion",
    component: Accordion,
    args: { items, defaultValue: ["recipes"] },
    argTypes: {
      variant: { control: "select", options: VARIANTS },
      colorPalette: { control: "select", options: PALETTES },
      size: { control: "select", options: SIZES },
      multiple: { control: "boolean" },
      collapsible: { control: "boolean" },
      disabled: { control: "boolean" },
    },
  });
</script>

<Story name="Playground">
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args} />
    </div>
  {/snippet}
</Story>

<!-- The four shapes. Only the chrome changes; the anatomy is identical. -->
<Story name="Variants">
  {#snippet template(args)}
    <div class="{grid} {frame}">
      {#each VARIANTS as variant (variant)}
        <div class={row}>
          <span class={legend}>{variant}</span>
          <Accordion {...args} {variant} />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args)}
    <div class="{grid} {frame}">
      {#each SIZES as size (size)}
        <div class={row}>
          <span class={legend}>{size}</span>
          <Accordion {...args} {size} />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<!-- Shape and intent are independent — the expanded trigger and its icon carry it. -->
<Story name="Intents">
  {#snippet template(args)}
    <div class="{grid} {frame}">
      {#each PALETTES as colorPalette (colorPalette)}
        <div class={row}>
          <span class={legend}>{colorPalette}</span>
          <Accordion {...args} {colorPalette} />
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<!-- `multiple` lets several panels stay open; `collapsible` lets the last one close. -->
<Story
  name="Multiple"
  args={{ multiple: true, collapsible: true, defaultValue: ["recipes", "intents"] }}
>
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args} />
    </div>
  {/snippet}
</Story>

<!-- Disabled on the accordion; `disabled` on one item disables just that row. -->
<Story name="Disabled" args={{ disabled: true }}>
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args} />
    </div>
  {/snippet}
</Story>

<Story name="DisabledItem" args={{ items: items.map((item, i) => ({ ...item, disabled: i === 1 })) }}>
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args} />
    </div>
  {/snippet}
</Story>

<!-- `trailingIcon` replaces the chevron; `ui.trailingIcon` retunes how it animates. -->
<Story
  name="TrailingIcon"
  args={{ trailingIcon: PlusIcon, ui: { trailingIcon: "data-[state=open]:rotate-45" } }}
>
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args} />
    </div>
  {/snippet}
</Story>

<!--
  Every part a caller might want to replace is a snippet — Vue and React spell the same
  five as named slots and render props. `children` is the trigger's label; `body` is the
  panel's.
-->
<Story name="Slots">
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args}>
        {#snippet children({ item, index })}
          <span class="tabular-nums text-fg-muted">{index + 1}.</span>
          {item.label}
        {/snippet}
        {#snippet body({ item, open })}
          <p>{item.content}</p>
          <p class="mt-2 text-2xs uppercase tracking-wide">{open ? "open" : "closed"}</p>
        {/snippet}
      </Accordion>
    </div>
  {/snippet}
</Story>

<!--
  A row that names a `slot` is rendered by the entry of that name in `slots`: `{slot}`
  replaces its whole panel, `{slot}-body` only what sits inside it. The rows that name
  none keep rendering their `content`.
-->
<Story
  name="PerItemSlots"
  args={{ items: items.map((item, i) => (i === 0 ? { ...item, slot: "styling" } : item)) }}
>
  {#snippet template(args)}
    {#snippet stylingBody({ item }: { item: AccordionItem })}
      <p>{item.content}</p>
      <code class="mt-2 block rounded bg-surface-subtle px-2 py-1 text-2xs">
        packages/styles/src/themes
      </code>
    {/snippet}

    <div class={frame}>
      <Accordion {...args} slots={{ "styling-body": stylingBody }} />
    </div>
  {/snippet}
</Story>

<!--
  `ui` reaches every slot of the theme, so one prop restyles triggers, icons and bodies at
  once. An item's own `ui` is merged over it, for one row only.
-->
<Story
  name="Customized"
  args={{
    ui: {
      root: "rounded-none border-x-0",
      trigger: "font-semibold uppercase tracking-wide",
      trailingIcon: "text-intent-fg",
      body: "text-fg",
    },
  }}
>
  {#snippet template(args)}
    <div class={frame}>
      <Accordion {...args} />
    </div>
  {/snippet}
</Story>

<!--
  The same overrides applied app-wide. Anything a `ui` prop can say, a `ThemeConfig` can
  say for every accordion at once — including which variant is the default.
-->
<Story name="ThemedApp">
  {#snippet template(args)}
    <NeoUIProvider theme={flatTheme}>
      <div class={frame}>
        <Accordion {...args} />
      </div>
    </NeoUIProvider>
  {/snippet}
</Story>
