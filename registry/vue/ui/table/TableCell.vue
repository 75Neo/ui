<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

interface TableCellProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableCellProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <td :class="cn(styles.cell(), props.class)">
    <slot />
  </td>
</template>
