<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogHeader = cva("flex shrink-0 items-start gap-3 border-b border-muted", {
  variants: { size: dialogSizeData.header },
  defaultVariants: dialogDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const headerClass = computed(() => cn(dialogHeader(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="dialog-header" :class="headerClass">
    <slot />
  </div>
</template>
