<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

interface TableHeadProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableHeadProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = table();
</script>

<template>
  <th :class="cn(styles.head(), props.class)">
    <slot />
  </th>
</template>
