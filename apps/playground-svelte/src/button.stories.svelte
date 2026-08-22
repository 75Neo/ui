<script module lang="ts">
  import { css } from "@75neo/styles/css";
  import { Button } from "@75neo/svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const VARIANTS = ["solid", "subtle", "outline", "ghost", "link"] as const;
  const PALETTES = ["accent", "neutral", "success", "warning", "danger", "info"] as const;
  const SIZES = ["xs", "sm", "md", "lg"] as const;

  const row = css({ display: "flex", gap: "3", alignItems: "center", flexWrap: "wrap" });
  const grid = css({ display: "grid", gap: "3" });
  const legend = css({ textStyle: "label.sm", color: "fg.muted", textTransform: "uppercase" });

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
