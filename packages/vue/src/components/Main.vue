<script setup lang="ts">
import { main, type MainProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";

/**
 * Renders a `main`, which is the landmark a screen reader jumps to, so there should be
 * exactly one of these on a page.
 */
const props = defineProps<MainProps & { class?: unknown }>();

defineSlots<{
  /** The page's own content. */
  default?: () => unknown;
}>();

const theme = useResolvedTheme(
  main,
  "main",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <main data-slot="base" :class="theme.class.base">
    <slot />
  </main>
</template>
