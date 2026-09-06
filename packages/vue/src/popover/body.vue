<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverBody = cva("min-w-0 text-toned", {
  variants: { size: popoverSizeData.body },
  defaultVariants: popoverDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePopoverVariants();
const bodyClass = computed(() => cn(popoverBody(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="popover-body" :class="bodyClass">
    <slot />
  </div>
</template>
