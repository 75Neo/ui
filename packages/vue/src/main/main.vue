<script setup lang="ts">
import { cn, mainHeightClass } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <!-- The page's content region, sized to fill what the Header leaves. -->
  <main data-slot="main" :class="cn(mainHeightClass, props.class as string | undefined)">
    <slot />
  </main>
</template>
