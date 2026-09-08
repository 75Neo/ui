<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelCloseTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelCloseTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = floatingPanel();
</script>

<template>
  <Ark.CloseTrigger :class="cn(styles.closeTrigger(), props.class)">
    <slot />
  </Ark.CloseTrigger>
</template>
