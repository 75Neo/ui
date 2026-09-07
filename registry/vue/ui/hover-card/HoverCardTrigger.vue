<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";

interface HoverCardTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<HoverCardTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Trigger :class="props.class">
    <slot />
  </Ark.Trigger>
</template>
