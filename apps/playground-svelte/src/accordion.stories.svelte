<script module lang="ts">
  import { css } from "@75neo/styles/css";
  import { Accordion } from "@75neo/svelte";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const VARIANTS = ["outline", "subtle", "elevated", "plain"] as const;
  const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
  const SIZES = ["sm", "md", "lg"] as const;

  const items = [
    {
      value: "recipes",
      title: "Where does styling live?",
      content:
        "In one recipe under packages/styles. React, Vue and Svelte all render the class names it produces, so a variant is added once rather than three times.",
    },
    {
      value: "intents",
      title: "How are shape and intent kept apart?",
      content:
        "Every intent palette fills the same eight roles, so a recipe writes each shape once against colorPalette.* and gets all six intents for free.",
    },
    {
      value: "modes",
      title: "What happens in dark mode?",
      content:
        "Components style against semantic tokens, which resolve per colour mode. Nothing inside a component ever branches on _dark.",
    },
  ];

  const grid = css({ display: "grid", gap: "6" });
  const row = css({ display: "grid", gap: "2" });
  const frame = css({ maxWidth: "lg" });
  const legend = css({
    textStyle: "label.sm",
    color: "fg.muted",
    textTransform: "uppercase",
  });
  const plus = css({ _open: { transform: "rotate(45deg)" } });

  const { Story } = defineMeta({
    title: "Components/Accordion",
    component: Accordion.Root,
    args: { defaultValue: ["recipes"] },
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

{#snippet rows()}
  {#each items as item (item.value)}
    <Accordion.Item value={item.value}>
      <Accordion.ItemTrigger>
        {item.title}
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
    </Accordion.Item>
  {/each}
{/snippet}

<Story name="Playground">
  {#snippet template(args)}
    <div class={frame}>
      <Accordion.Root {...args}>
        {@render rows()}
      </Accordion.Root>
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
          <Accordion.Root {...args} {variant}>
            {@render rows()}
          </Accordion.Root>
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
          <Accordion.Root {...args} {size}>
            {@render rows()}
          </Accordion.Root>
        </div>
      {/each}
    </div>
  {/snippet}
</Story>

<!-- Shape and intent are independent — the expanded header and its indicator carry it. -->
<Story name="Intents">
  {#snippet template(args)}
    <div class="{grid} {frame}">
      {#each PALETTES as colorPalette (colorPalette)}
        <div class={row}>
          <span class={legend}>{colorPalette}</span>
          <Accordion.Root {...args} {colorPalette}>
            {@render rows()}
          </Accordion.Root>
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
      <Accordion.Root {...args}>
        {@render rows()}
      </Accordion.Root>
    </div>
  {/snippet}
</Story>

<!-- Disabled on the root; pass it to a single `Item` to disable just that row. -->
<Story name="Disabled" args={{ disabled: true }}>
  {#snippet template(args)}
    <div class={frame}>
      <Accordion.Root {...args}>
        {@render rows()}
      </Accordion.Root>
    </div>
  {/snippet}
</Story>

<!-- `ItemIndicator` renders a chevron unless you give it something else. -->
<Story name="CustomIndicator">
  {#snippet template(args)}
    <div class={frame}>
      <Accordion.Root {...args}>
        {#each items as item (item.value)}
          <Accordion.Item value={item.value}>
            <Accordion.ItemTrigger>
              {item.title}
              <Accordion.ItemIndicator class={plus}>
                <PlusIcon aria-hidden="true" />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>{item.content}</Accordion.ItemContent>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    </div>
  {/snippet}
</Story>
