<script setup lang="ts">
import { computed } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverTitle = cva("font-semibold text-highlighted", {
  variants: {
    size: popoverSizeData.title,
    close: { true: "pe-6", false: "" },
  },
  defaultVariants: popoverDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePopoverVariants();
const titleClass = computed(() => cn(popoverTitle(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Title data-slot="popover-title" :class="titleClass">
    <slot />
  </Ark.Title>
</template>
