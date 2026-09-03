<script setup lang="ts">
import { footer, type FooterProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * The strip along the bottom of a page: three regions in a row, and two optional bands
 * above and below it.
 *
 * @remarks
 * The regions are written into the DOM in the order right, centre, left and put back in
 * reading order by the recipe, so a phone stacks the links above the copyright. Nothing
 * about that is visible from here; see the note on the recipe.
 */
const props = defineProps<FooterProps & { class?: unknown }>();

defineSlots<{
  /** The middle of the row, usually a short navigation. */
  default?: () => unknown;
  /** The start of the row, usually a copyright line. */
  left?: () => unknown;
  /** The end of the row, usually social or legal links. */
  right?: () => unknown;
  /** A full-width band above the row. */
  top?: () => unknown;
  /** A full-width band below the row. */
  bottom?: () => unknown;
}>();

const theme = useResolvedTheme(
  footer,
  "footer",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <footer data-slot="base" :class="theme.class.base">
    <div v-if="$slots.top" data-slot="top" :class="theme.class.top">
      <slot name="top" />
    </div>

    <div data-slot="container" :class="theme.class.container">
      <div data-slot="right" :class="theme.class.right">
        <slot name="right" />
      </div>
      <div data-slot="center" :class="theme.class.center">
        <slot />
      </div>
      <div data-slot="left" :class="theme.class.left">
        <slot name="left" />
      </div>
    </div>

    <div v-if="$slots.bottom" data-slot="bottom" :class="theme.class.bottom">
      <slot name="bottom" />
    </div>
  </footer>
</template>
