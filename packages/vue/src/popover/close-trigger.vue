<script setup lang="ts">
import { computed } from "vue";
import { Popover as Ark } from "@ark-ui/vue/popover";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverCloseTrigger = cva(
  "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: popoverSizeData.closeTrigger },
    defaultVariants: popoverDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePopoverVariants();
const closeTriggerClass = computed(() =>
  cn(popoverCloseTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CloseTrigger
    data-slot="popover-close-trigger"
    :class="closeTriggerClass"
    aria-label="Close popover"
  >
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CloseTrigger>
</template>
