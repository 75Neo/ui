<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { table } from "@/registry/shared/lib/table.styles";

interface TableProps {
  containerClass?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<TableProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = table();
</script>

<template>
  <div :class="cn(styles.container(), props.containerClass)">
    <table :class="cn(styles.root(), props.class)">
      <slot />
    </table>
  </div>
</template>
