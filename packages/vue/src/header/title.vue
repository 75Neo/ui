<script setup lang="ts">
import { computed } from "vue";
import { cn, headerClasses, type HeaderTitleProps } from "@75neo/themes";

const props = defineProps<
  HeaderTitleProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const titleClass = computed(() => cn(headerClasses.title, props.class as string | undefined));
</script>

<template>
  <!-- The wordmark at the start of the bar. A link when given an address. -->
  <component
    :is="props.href != null ? 'a' : 'span'"
    :href="props.href"
    data-slot="header-title"
    :class="titleClass"
  >
    <slot />
  </component>
</template>
