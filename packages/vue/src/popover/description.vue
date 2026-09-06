<script setup lang="ts">
import { computed } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverDescription = cva("text-muted", {
  variants: {
    size: popoverSizeData.description,
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
const descriptionClass = computed(() =>
  cn(popoverDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Description data-slot="popover-description" :class="descriptionClass">
    <slot />
  </Ark.Description>
</template>
