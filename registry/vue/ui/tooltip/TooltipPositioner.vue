<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { cn } from "cn";
import { tooltip } from "@/registry/shared/lib/tooltip.styles";

interface TooltipPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TooltipPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tooltip();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
