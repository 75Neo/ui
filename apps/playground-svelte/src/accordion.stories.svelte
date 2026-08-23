<script module lang="ts">
  import { Accordion, type AccordionItem, NeoUIProvider, type ThemeConfig } from "@75neo/svelte";
  import LeafIcon from "@lucide/svelte/icons/leaf";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import ShapesIcon from "@lucide/svelte/icons/shapes";
  import SunMoonIcon from "@lucide/svelte/icons/sun-moon";
  import { defineMeta } from "@storybook/addon-svelte-csf";

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
      label: "How are shape and colour kept apart?",
      icon: ShapesIcon,
      content:
        "A palette re-points a single custom property, so a theme writes each shape once against intent-* and gets every colour for free.",
    },
    {
      value: "modes",
      label: "What happens in dark mode?",
      icon: SunMoonIcon,
      content:
        "Components style against semantic utilities such as bg-elevated and text-muted, which resolve per colour mode. Nothing inside a component ever branches on dark: itself.",
    },
  ];

  const frame = "max-w-lg";

  const boxedTheme: ThemeConfig = {
    accordion: {
      slots: {
        root: "overflow-hidden rounded-lg border border-default px-4",
        trigger: "font-semibold",
      },
    },
  };

  const { Story } = defineMeta({
    title: "Components/Accordion",
    component: Accordion,
    args: { items, defaultValue: ["recipes"] },
    argTypes: {
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
  args={{ trailingIcon: PlusIcon, ui: { trailingIcon: "group-data-[state=open]:rotate-45" } }}
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
          <span class="tabular-nums text-muted">{index + 1}.</span>
          {item.label}
        {/snippet}
        {#snippet body({ item, open })}
          <p>{item.content}</p>
          <p class="mt-2 text-xs uppercase tracking-wide">{open ? "open" : "closed"}</p>
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
      <code class="mt-2 block rounded bg-elevated px-2 py-1 text-xs">
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
      item: "border-accented",
      trigger: "font-semibold uppercase tracking-wide",
      trailingIcon: "text-primary",
      body: "text-toned",
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
  say for every accordion at once.
-->
<Story name="ThemedApp">
  {#snippet template(args)}
    <NeoUIProvider theme={boxedTheme}>
      <div class={frame}>
        <Accordion {...args} />
      </div>
    </NeoUIProvider>
  {/snippet}
</Story>
