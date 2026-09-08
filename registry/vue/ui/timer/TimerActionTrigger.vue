<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import type { TimerActionTriggerProps as ArkActionTriggerProps } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

interface TimerActionTriggerProps {
  action: ArkActionTriggerProps["action"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<TimerActionTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ActionTrigger :action="props.action" :class="cn(styles.actionTrigger(), props.class)">
    <slot />
  </Ark.ActionTrigger>
</template>
