<script setup lang="ts">
import type { ThemeConfig } from "@75neo/core";
import { provideTheme } from "../composables/theme";

const props = defineProps<{
  theme: ThemeConfig;
}>();

defineSlots<{ default?: () => unknown }>();

provideTheme(() => props.theme);
</script>

<template>
  <slot />
</template>
