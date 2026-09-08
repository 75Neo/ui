<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { cn } from "cn";
import { tooltipStyles as styles } from "@/registry/shared/lib/tooltip.styles";

interface TooltipArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TooltipArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
