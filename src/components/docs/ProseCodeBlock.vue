<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface ProseCodeBlockProps {
  language?: string;
  filename?: string;
  meta?: string;
  highlights?: number[];
  class?: HTMLAttributes["class"];
}

const props = defineProps<ProseCodeBlockProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div class="relative">
    <pre :class="[props.class, 'pe-14']" :data-language="props.language"><slot /></pre>
    <div data-code-copy class="absolute end-2 top-2"></div>
  </div>
</template>
