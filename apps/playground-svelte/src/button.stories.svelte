<script module lang="ts">
  import { Button, NeoUIProvider, type ThemeConfig } from "@75neo/svelte";
  // Imported per icon rather than from the barrel, which Lucide recommends so Vite's
  // dev server does not have to process the whole set.
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import SearchIcon from "@lucide/svelte/icons/search";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const VARIANTS = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;
  const COLORS = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "error",
    "neutral",
  ] as const;
  const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

  const row = "flex flex-wrap items-center gap-3";
  const grid = "grid gap-3";
  const legend = "text-xs font-medium uppercase tracking-wide text-muted";

  const pillTheme: ThemeConfig = {
    button: {
      slots: { base: "rounded-full" },
      defaultVariants: { color: "neutral" },
    },
  };

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    argTypes: {
      variant: { control: "select", options: VARIANTS },
      color: { control: "select", options: COLORS },
      size: { control: "select", options: SIZES },
      block: { control: "boolean" },
      square: { control: "boolean" },
      loading: { control: "boolean" },
      disabled: { control: "boolean" },
    },
  });
</script>

<Story name="Playground">
  <Button label="Button" />
</Story>

<!-- The emphasis ladder, at a single colour. -->
<Story name="Variants">
  <div class={row}>
    {#each VARIANTS as variant (variant)}
      <Button {variant} label={variant} />
    {/each}
  </div>
</Story>

<!--
  Shape and colour are independent — every row below is the same six variants. Only
  `neutral` is spelled out in the theme; the other six re-point one custom property.
-->
<Story name="Colors">
  <div class={grid}>
    {#each COLORS as color (color)}
      <div class={grid}>
        <span class={legend}>{color}</span>
        <div class={row}>
          {#each VARIANTS as variant (variant)}
            <Button {variant} {color} label={variant} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Story>

<!-- Padding-driven, so a button grows with its own text rather than a fixed height. -->
<Story name="Sizes">
  <div class={row}>
    {#each SIZES as size (size)}
      <Button {size} label={size} />
    {/each}
  </div>
</Story>

<!-- `icon` leads by default; `trailing` moves it, and the two sided props are absolute. -->
<Story name="Icons">
  <div class={row}>
    <Button icon={PlusIcon} label="Add item" />
    <Button icon={ArrowRightIcon} trailing label="Continue" />
    <Button leadingIcon={SearchIcon} trailingIcon={ArrowRightIcon} label="Search" />
  </div>
</Story>

<!-- No label and no children makes the button square, without `square` being passed. -->
<Story name="IconOnly">
  <div class={row}>
    {#each SIZES as size (size)}
      <Button {size} icon={PlusIcon} aria-label="Add ({size})" />
    {/each}
  </div>
</Story>

<!-- The spinner replaces whichever icon is showing, and the button disables itself. -->
<Story name="Loading">
  <div class={row}>
    <Button loading label="Saving" />
    <Button loading trailing icon={ArrowRightIcon} label="Saving" />
    <Button loading aria-label="Saving" />
  </div>
</Story>

<!-- Full width, with the trailing icon pushed to the far edge so the button reads as a row. -->
<Story name="Block">
  <div class="grid max-w-sm gap-3">
    {#each VARIANTS as variant (variant)}
      <Button block {variant} label={variant} trailingIcon={ArrowRightIcon} />
    {/each}
  </div>
</Story>

<Story name="Disabled">
  <div class={row}>
    {#each VARIANTS as variant (variant)}
      <Button {variant} label={variant} disabled />
    {/each}
  </div>
</Story>

<!--
  `class` is merged by `tailwind-merge`, not appended: `rounded-full` replaces the
  theme's `rounded-md` and `px-8` replaces the size variant's `px-2.5`, with no
  `!important` and no knowledge of what the theme picked.
-->
<Story name="OverridingClasses">
  <div class={row}>
    <Button label="default" />
    <Button class="rounded-full px-8" label="rounded-full px-8" />
    <Button ui={{ label: "uppercase tracking-widest" }} label="via ui" />
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
        <Button {variant} label={variant} />
      {/each}
    </div>
  </NeoUIProvider>
</Story>
