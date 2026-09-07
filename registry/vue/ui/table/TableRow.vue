<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

interface TableRowProps {
  selected?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableRowProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = table();
</script>

<template>
  <tr :data-state="props.selected ? 'selected' : undefined" :class="cn(styles.row(), props.class)">
    <slot />
  </tr>
</template>
