<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

interface TableBodyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableBodyProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <tbody :class="cn(styles.body(), props.class)">
    <slot />
  </tbody>
</template>
