<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = floatingPanel();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
