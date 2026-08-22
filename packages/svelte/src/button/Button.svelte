<script lang="ts">
  import { cx } from "@75neo/styles/css";
  import { button, type ButtonVariantProps } from "@75neo/styles/recipes";
  import { Ark } from "@ark-ui/svelte/factory";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  // `class` is narrowed to a string so it can be merged by `cx`.
  export type ButtonProps = Omit<HTMLButtonAttributes, "class"> &
    ButtonVariantProps & {
      class?: string;
      children?: Snippet;
    };

  let {
    variant,
    size,
    colorPalette,
    fullWidth,
    class: className,
    children,
    ...rest
  }: ButtonProps = $props();
</script>

<!-- Ark's polymorphic element (so `asChild` works) wearing the shared `button` recipe. -->
<Ark
  as="button"
  class={cx(button({ variant, size, colorPalette, fullWidth }), className)}
  {...rest}
>
  {@render children?.()}
</Ark>
