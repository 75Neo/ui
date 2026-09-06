<script setup lang="ts">
import { computed } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cva } from "class-variance-authority";
import { cn, timerDefaults, timerSizeData, type TimerItemProps } from "@75neo/themes";
import { useTimerVariants } from "./variants";

const timerItem = cva("min-w-[2ch] text-center font-semibold text-highlighted tabular-nums", {
  variants: { size: timerSizeData.item },
  defaultVariants: timerDefaults,
});

const props = defineProps<
  TimerItemProps & {
    class?: unknown;
  }
>();

const variants = useTimerVariants();
const itemClass = computed(() => cn(timerItem(variants), props.class as string | undefined));
const labelClass = computed(() => cn("text-muted", timerSizeData.label[variants.size]));
</script>

<template>
  <!-- The column, not the digits: Ark's Item is the digits and the name sits under it. -->
  <span data-slot="timer-item-group" class="flex min-w-0 flex-col items-center">
    <Ark.Item :type="props.type" data-slot="timer-item" :class="itemClass" />
    <span v-if="!props.hideLabel" data-slot="timer-label" :class="labelClass">
      {{ props.label ?? props.type }}
    </span>
  </span>
</template>
