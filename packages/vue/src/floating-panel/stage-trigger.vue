<script setup lang="ts">
import { computed } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { Minus as MinusIcon } from "@lucide/vue";
import {
  cn,
  floatingPanelDefaults,
  floatingPanelSizeData,
  type FloatingPanelStage,
} from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelStageTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: floatingPanelSizeData.stageTrigger },
    defaultVariants: floatingPanelDefaults,
  },
);

const props = defineProps<{
  stage: FloatingPanelStage;
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFloatingPanelVariants();
const stageTriggerClass = computed(() =>
  cn(floatingPanelStageTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.StageTrigger
    data-slot="floating-panel-stage-trigger"
    :data-stage="props.stage"
    :stage="props.stage"
    :class="stageTriggerClass"
  >
    <slot>
      <component :is="MinusIcon" />
    </slot>
  </Ark.StageTrigger>
</template>
