<script setup lang="ts">
import { computed } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cva } from "class-variance-authority";
import { cn, timerDefaults, timerSizeData } from "@75neo/themes";
import { useTimerVariants } from "./variants";

const timerSeparator = cva("font-semibold text-muted tabular-nums", {
  variants: { size: timerSizeData.separator },
  defaultVariants: timerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTimerVariants();
const separatorClass = computed(() =>
  cn(timerSeparator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Separator data-slot="timer-separator" :class="separatorClass">
    <slot>:</slot>
  </Ark.Separator>
</template>
