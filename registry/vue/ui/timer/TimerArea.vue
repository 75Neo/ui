<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

interface TimerAreaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TimerAreaProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Area :class="cn(styles.area(), props.class)">
    <slot />
  </Ark.Area>
</template>
