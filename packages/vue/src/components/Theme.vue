<script setup lang="ts">
import type { ThemeConfig } from "@75neo/core";
import { provideTheme } from "../composables/useComponentTheme";

const props = defineProps<{
  /** A layer of per-component overrides, keyed by component. */
  theme: ThemeConfig;
}>();

defineSlots<{ default?: () => unknown }>();

provideTheme(() => props.theme);
</script>

<template>
  <slot />
</template>
