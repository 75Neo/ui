<script setup lang="ts">
import { computed } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { cn, type FloatingPanelResizeAxis } from "@75neo/themes";

const floatingPanelResizeTrigger = cva("absolute z-10 touch-none", {
  variants: {
    axis: {
      n: "left-1/2 top-0 h-1.5 w-3/4 -translate-x-1/2 cursor-ns-resize",
      s: "bottom-0 left-1/2 h-1.5 w-3/4 -translate-x-1/2 cursor-ns-resize",
      e: "right-0 top-1/2 h-3/4 w-1.5 -translate-y-1/2 cursor-ew-resize",
      w: "left-0 top-1/2 h-3/4 w-1.5 -translate-y-1/2 cursor-ew-resize",
      ne: "right-0 top-0 size-2.5 cursor-nesw-resize",
      sw: "bottom-0 left-0 size-2.5 cursor-nesw-resize",
      nw: "left-0 top-0 size-2.5 cursor-nwse-resize",
      se: "bottom-0 right-0 size-2.5 cursor-nwse-resize",
    } satisfies Record<FloatingPanelResizeAxis, string>,
  },
});

const props = defineProps<{
  axis: FloatingPanelResizeAxis;
  class?: unknown;
}>();

const resizeTriggerClass = computed(() =>
  cn(floatingPanelResizeTrigger({ axis: props.axis }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ResizeTrigger
    data-slot="floating-panel-resize-trigger"
    :data-axis="props.axis"
    :axis="props.axis"
    :class="resizeTriggerClass"
  />
</template>
