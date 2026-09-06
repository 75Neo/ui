<script setup lang="ts">
import { computed } from "vue";
import { Swap as Ark } from "@ark-ui/vue/swap";
import { cva } from "class-variance-authority";
import { cn, swapDefaults, swapSizeData, type SwapIndicatorProps } from "@75neo/themes";
import { useSwapVariants } from "./variants";

const swapIndicator = cva("shrink-0 [&>svg]:size-full", {
  variants: { size: swapSizeData.indicator },
  defaultVariants: swapDefaults,
});

const props = defineProps<
  SwapIndicatorProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSwapVariants();
const indicatorClass = computed(() =>
  cn(swapIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator
    :type="props.type"
    :data-slot="`swap-${props.type}-indicator`"
    :class="indicatorClass"
  >
    <slot />
  </Ark.Indicator>
</template>
