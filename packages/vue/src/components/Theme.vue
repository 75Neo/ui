<script setup lang="ts">
import type { ThemeConfig } from "@75neo/core";
import { provideThemeScope } from "../composables/useTheme";

const props = defineProps<{
  /** A layer of per-component overrides, keyed by component. */
  theme: ThemeConfig;
}>();

defineSlots<{ default?: () => unknown }>();

provideThemeScope(() => props.theme);
</script>

<template>
  <slot />
</template>
