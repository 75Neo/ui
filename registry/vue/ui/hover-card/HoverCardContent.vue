<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { HoverCard as Ark } from "@ark-ui/vue/hover-card";
import { cn } from "cn";
import { hoverCard } from "@/registry/shared/lib/hover-card.styles";

interface HoverCardContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<HoverCardContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = hoverCard();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
