<script lang="ts">
  import type { AccordionSlots, AccordionVariants } from "@75neo/styles";
  import { Accordion as Ark } from "@ark-ui/svelte/accordion";
  import { useComponentTheme } from "../theme";
  import { setAccordionStyles } from "./context";

  /** `Root`'s counterpart for the `useAccordion` hook — same styling, external state. */
  export type RootProviderProps = Omit<Ark.RootProviderProps, "class"> &
    AccordionVariants & {
      class?: string;
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
  }: RootProviderProps = $props();

  const theme = useComponentTheme("accordion");
  const slots = $derived(theme()({ variant, size, colorPalette }));

  setAccordionStyles(() => ({ slots, ui }));
</script>

<Ark.RootProvider class={slots.root({ class: [ui?.root, className] })} {...rest}>
  {@render children?.()}
</Ark.RootProvider>
