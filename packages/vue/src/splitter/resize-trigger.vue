<script setup lang="ts">
import { computed } from "vue";
import {
  Splitter as Ark,
  type SplitterResizeTriggerProps as ArkResizeTriggerProps,
} from "@ark-ui/vue/splitter";
import { cva } from "class-variance-authority";
import {
  cn,
  splitterDefaults,
  splitterSizeData,
  type SplitterResizeTriggerProps,
} from "@75neo/themes";
import { useSplitterVariants } from "./variants";

const splitterResizeTrigger = cva(
  "group/handle flex shrink-0 cursor-col-resize touch-none items-center justify-center rounded-full outline-primary/25 select-none focus-visible:outline-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[orientation=vertical]:cursor-row-resize",
  {
    variants: { size: splitterSizeData.resizeTrigger },
    defaultVariants: splitterDefaults,
  },
);

const splitterIndicator = cva(
  "rounded-full bg-accented transition-colors group-hover/handle:bg-inverted/60 group-focus-visible/handle:bg-inverted/60 group-data-[dragging]/handle:bg-inverted",
  {
    variants: { size: splitterSizeData.indicator },
    defaultVariants: splitterDefaults,
  },
);

const props = defineProps<
  SplitterResizeTriggerProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSplitterVariants();
const triggerClass = computed(() =>
  cn(splitterResizeTrigger({ size: variants.size }), props.class as string | undefined),
);
const indicatorClass = computed(() => splitterIndicator({ size: variants.size }));
const handleId = computed(() => props.id as ArkResizeTriggerProps["id"]);
</script>

<template>
  <Ark.ResizeTrigger
    :id="handleId"
    :disabled="props.disabled"
    data-slot="splitter-resize-trigger"
    :class="triggerClass"
  >
    <slot>
      <Ark.ResizeTriggerIndicator
        data-slot="splitter-resize-trigger-indicator"
        :class="indicatorClass"
      />
    </slot>
  </Ark.ResizeTrigger>
</template>
