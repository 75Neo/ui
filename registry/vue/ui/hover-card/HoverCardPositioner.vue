<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cn } from "cn";
import { hoverCard } from "@/registry/shared/lib/hover-card.styles";

interface HoverCardPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<HoverCardPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = hoverCard();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
