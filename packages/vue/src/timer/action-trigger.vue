<script setup lang="ts">
import { computed } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cva } from "class-variance-authority";
import { cn, timerDefaults, timerSizeData, type TimerActionTriggerProps } from "@75neo/themes";
import { useTimerVariants } from "./variants";

const timerActionTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-default font-medium text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:ring-inverted focus-visible:outline-3 active:bg-elevated disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: { size: timerSizeData.actionTrigger },
    defaultVariants: timerDefaults,
  },
);

const props = defineProps<
  TimerActionTriggerProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTimerVariants();
const actionTriggerClass = computed(() =>
  cn(timerActionTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ActionTrigger
    :action="props.action"
    data-slot="timer-action-trigger"
    :class="actionTriggerClass"
  >
    <slot />
  </Ark.ActionTrigger>
</template>
