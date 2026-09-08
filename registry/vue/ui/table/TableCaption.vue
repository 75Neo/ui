<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

interface TableCaptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableCaptionProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <caption :class="cn(styles.caption(), props.class)">
    <slot />
  </caption>
</template>
