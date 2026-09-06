<script setup lang="ts">
import { computed } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelCloseTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: floatingPanelSizeData.closeTrigger },
    defaultVariants: floatingPanelDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFloatingPanelVariants();
const closeTriggerClass = computed(() =>
  cn(floatingPanelCloseTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CloseTrigger
    data-slot="floating-panel-close-trigger"
    :class="closeTriggerClass"
    aria-label="Close panel"
  >
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CloseTrigger>
</template>
