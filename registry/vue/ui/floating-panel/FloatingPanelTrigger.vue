<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";

interface FloatingPanelTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger :class="props.class">
    <slot />
  </Ark.Trigger>
</template>
