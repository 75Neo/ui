<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cn } from "cn";
import { hoverCardStyles as styles } from "@/registry/shared/lib/hover-card.styles";

interface HoverCardArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<HoverCardArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
