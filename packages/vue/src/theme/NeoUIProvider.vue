<script setup lang="ts">
import type { ThemeConfig } from "@75neo/styles";
import type { PropType } from "vue";
import { provideNeoUITheme } from "./context";

/**
 * Applies a theme to one subtree, for apps that theme one section differently or that
 * would rather not install the plugin.
 */
defineOptions({ name: "NeoUIProvider" });

const props = defineProps({
  theme: { type: Object as PropType<ThemeConfig>, default: undefined },
});

provideNeoUITheme(() => props.theme ?? null);
</script>

<template>
  <slot />
</template>
