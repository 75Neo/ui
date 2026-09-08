<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

interface TimerProps {
  startMs?: number;
  targetMs?: number;
  interval?: number;
  countdown?: boolean;
  autoStart?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TimerProps>(), {
  countdown: undefined,
  autoStart: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    :start-ms="props.startMs"
    :target-ms="props.targetMs"
    :interval="props.interval"
    :countdown="props.countdown"
    :auto-start="props.autoStart"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
