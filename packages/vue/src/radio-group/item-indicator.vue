<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, radioGroupDefaults, radioGroupSizeData } from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemIndicator = cva(
  "rounded-full bg-default opacity-0 transition-opacity group-data-[state=checked]/control:opacity-100",
  {
    variants: { size: radioGroupSizeData.indicator },
    defaultVariants: radioGroupDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useRadioGroupVariants();
const itemIndicatorClass = computed(() =>
  cn(radioGroupItemIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <span data-slot="radio-group-item-indicator" :class="itemIndicatorClass" />
</template>
