<script setup lang="ts">
import { computed } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourCloseTrigger = cva(
  "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: tourSizeData.closeTrigger },
    defaultVariants: tourDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTourVariants();
const closeTriggerClass = computed(() =>
  cn(tourCloseTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CloseTrigger
    data-slot="tour-close-trigger"
    :class="closeTriggerClass"
    aria-label="Close tour"
  >
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CloseTrigger>
</template>
