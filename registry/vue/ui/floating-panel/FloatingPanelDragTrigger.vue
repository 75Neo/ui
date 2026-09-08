<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelDragTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelDragTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.DragTrigger :class="cn(styles.dragTrigger(), props.class)">
    <slot />
  </Ark.DragTrigger>
</template>
