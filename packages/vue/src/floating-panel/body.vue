<script setup lang="ts">
import { computed } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cva } from "class-variance-authority";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelBody = cva("min-w-0 flex-1 overflow-auto text-toned", {
  variants: { size: floatingPanelSizeData.body },
  defaultVariants: floatingPanelDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useFloatingPanelVariants();
const bodyClass = computed(() =>
  cn(floatingPanelBody(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Body data-slot="floating-panel-body" :class="bodyClass">
    <slot />
  </Ark.Body>
</template>
