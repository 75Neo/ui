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
  <pre :class="props.class" :data-language="props.language"><slot /></pre>
</template>
