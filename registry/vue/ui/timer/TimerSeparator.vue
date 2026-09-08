<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

interface TimerSeparatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TimerSeparatorProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Separator :class="cn(styles.separator(), props.class)">
    <slot />
  </Ark.Separator>
</template>
