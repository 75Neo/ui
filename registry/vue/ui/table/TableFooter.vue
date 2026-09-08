<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

interface TableFooterProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableFooterProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <tfoot :class="cn(styles.footer(), props.class)">
    <slot />
  </tfoot>
</template>
