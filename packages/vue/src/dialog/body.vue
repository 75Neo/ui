<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogBody = cva("min-h-0 flex-1 overflow-y-auto overscroll-contain text-toned", {
  variants: { size: dialogSizeData.body },
  defaultVariants: dialogDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const bodyClass = computed(() => cn(dialogBody(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="dialog-body" :class="bodyClass">
    <slot />
  </div>
</template>
