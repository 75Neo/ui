<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { table, type TableSize } from "@/registry/shared/lib/table.styles";

interface TableProps {
  containerClass?: HTMLAttributes["class"];
  size?: TableSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TableProps>(), {
  size: "md",
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = table();
</script>

<template>
  <div :class="cn(styles.container(), props.containerClass)">
    <table :data-size="props.size" :class="cn(styles.root(), props.class)">
      <slot />
    </table>
  </div>
</template>
