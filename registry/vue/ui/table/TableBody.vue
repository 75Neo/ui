<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

interface TableBodyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableBodyProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = table();
</script>

<template>
  <tbody :class="cn(styles.body(), props.class)">
    <slot />
  </tbody>
</template>
