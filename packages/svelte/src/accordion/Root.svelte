<script lang="ts">
  import type { AccordionSlots, AccordionVariants } from "@75neo/styles";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { useComponentTheme } from "../theme";
  import { setAccordionStyles } from "./context";

  // `class` is narrowed to a string so the theme's slot function can merge it.
  export type RootProps = Omit<Ark.RootProps, "class"> &
    AccordionVariants & {
      class?: string;
      /**
       * Per-slot class overrides for the whole accordion — `{ itemTrigger: "text-lg" }`
       * reaches every trigger below, without the parts having to be given props one by
       * one.
       */
      ui?: AccordionSlots;
    };

  let {
    variant,
    size,
    colorPalette,
    ui,
    class: className,
    children,
    ...rest
  }: RootProps = $props();

  const theme = useComponentTheme("accordion");
  const slots = $derived(theme()({ variant, size, colorPalette }));

  setAccordionStyles(() => ({ slots, ui }));
</script>

<Ark.Root class={slots.root({ class: [ui?.root, className] })} {...rest}>
  {@render children?.()}
</Ark.Root>
