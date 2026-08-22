<script lang="ts">
  import type { ButtonSlots, ButtonVariants } from "@75neo/styles";
  import { Ark } from "@ark-ui/svelte/factory";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { useComponentTheme } from "../theme";

  // `class` is narrowed to a string because Svelte 5 types it as `ClassValue`, which is
  // wider than what the theme's slot function accepts.
  export type ButtonProps = Omit<HTMLButtonAttributes, "class"> &
    ButtonVariants & {
      class?: string;
      /**
       * Per-slot class overrides. A button is one element, so `ui.base` and `class` do
       * the same thing — `ui` exists so every component in the library takes the same
       * two props.
       */
      ui?: ButtonSlots;
      children?: Snippet;
    };

  let {
    variant,
    size,
    colorPalette,
    fullWidth,
    ui,
    class: className,
    children,
    ...rest
  }: ButtonProps = $props();

  const theme = useComponentTheme("button");
  const slots = $derived(theme()({ variant, size, colorPalette, fullWidth }));
</script>

<!-- Ark's polymorphic element (so `asChild` works) wearing the shared `button` theme. -->
<Ark as="button" class={slots.base({ class: [ui?.base, className] })} {...rest}>
  {@render children?.()}
</Ark>
