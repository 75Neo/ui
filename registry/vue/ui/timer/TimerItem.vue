<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import type { TimerItemProps as ArkItemProps } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

interface TimerItemProps {
  type: ArkItemProps["type"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<TimerItemProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item :type="props.type" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
