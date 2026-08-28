<script setup lang="ts">
import { computed } from "vue";
import type { ThemeUI } from "@75neo/styles";
import { provideThemeContext } from "../composables/useTheme";

const props = defineProps<{
  ui?: ThemeUI;
}>();

const ui = computed(() => props.ui ?? {});
provideThemeContext(ui);
</script>

<template>
  <slot />
</template>
