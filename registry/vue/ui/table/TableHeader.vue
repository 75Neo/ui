<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

interface TableHeaderProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableHeaderProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = table();
</script>

<template>
  <thead :class="cn(styles.header(), props.class)">
    <slot />
  </thead>
</template>
