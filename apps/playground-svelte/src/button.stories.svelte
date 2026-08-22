<script module lang="ts">
  import { Button, NeoUIProvider, type ThemeConfig } from "@75neo/svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const VARIANTS = ["solid", "subtle", "outline", "ghost", "link"] as const;
  const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
  const SIZES = ["xs", "sm", "md", "lg"] as const;

  const row = "flex flex-wrap items-center gap-3";
  const grid = "grid gap-3";
  const legend = "text-xs font-medium uppercase tracking-wide text-fg-muted";

  const pillTheme: ThemeConfig = {
    button: {
      slots: { base: "rounded-full" },
      defaultVariants: { colorPalette: "neutral" },
    },
  };

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    argTypes: {
      variant: { control: "select", options: VARIANTS },
      colorPalette: { control: "select", options: PALETTES },
      size: { control: "select", options: SIZES },
      fullWidth: { control: "boolean" },
    },
  });
</script>

<Story name="Playground">
  <Button>Button</Button>
</Story>

<!-- The emphasis ladder, at a single intent. -->
<Story name="Variants">
  <div class={row}>
    {#each VARIANTS as variant (variant)}
      <Button {variant}>{variant}</Button>
    {/each}
  </div>
</Story>

<!-- Shape and intent are independent — every row below is the same five variants. -->
<Story name="Intents">
  <div class={grid}>
    {#each PALETTES as colorPalette (colorPalette)}
      <div class={grid}>
        <span class={legend}>{colorPalette}</span>
        <div class={row}>
          {#each VARIANTS as variant (variant)}
            <Button {variant} {colorPalette}>{variant}</Button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Story>

<Story name="Sizes">
  <div class={row}>
    {#each SIZES as size (size)}
      <Button {size}>{size}</Button>
    {/each}
  </div>
</Story>

<Story name="Disabled">
  <div class={row}>
    {#each VARIANTS as variant (variant)}
      <Button {variant} disabled>{variant}</Button>
    {/each}
  </div>
</Story>

<Story name="FullWidth">
  <Button fullWidth>Button</Button>
</Story>

<!--
  `class` is merged by `tailwind-merge`, not appended: `rounded-full` replaces the size
  variant's `rounded-md` and `px-8` replaces its `px-4`, with no `!important` and no
  knowledge of what the theme picked.
-->
<Story name="OverridingClasses">
  <div class={row}>
    <Button>default</Button>
    <Button class="rounded-full px-8">rounded-full px-8</Button>
    <Button ui={{ base: "uppercase tracking-widest" }}>via ui</Button>
  </div>
</Story>

<!--
  The same override applied to every button at once. `<NeoUIProvider>` merges a
  `ThemeConfig` into the built-in themes, so a whole app can be re-shaped without
  touching a call site.
-->
<Story name="ThemedApp">
  <NeoUIProvider theme={pillTheme}>
    <div class={row}>
      {#each VARIANTS as variant (variant)}
        <Button {variant}>{variant}</Button>
      {/each}
    </div>
  </NeoUIProvider>
</Story>
