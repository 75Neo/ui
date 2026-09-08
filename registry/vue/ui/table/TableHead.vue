<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { tableStyles as styles } from "@/registry/shared/lib/table.styles";

interface TableHeadProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableHeadProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <th :class="cn(styles.head(), props.class)">
    <slot />
  </th>
</template>
