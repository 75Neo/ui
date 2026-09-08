<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import type { TimerAction } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timer } from "@/registry/shared/lib/timer.styles";

interface TimerActionTriggerProps {
  action: TimerAction;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TimerActionTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = timer();
</script>

<template>
  <Ark.ActionTrigger :action="props.action" :class="cn(styles.actionTrigger(), props.class)">
    <slot />
  </Ark.ActionTrigger>
</template>
