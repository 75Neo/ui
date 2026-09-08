<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cn } from "cn";
import { timer } from "@/registry/shared/lib/timer.styles";

interface TimerAreaProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TimerAreaProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = timer();
</script>

<template>
  <Ark.Area :class="cn(styles.area(), props.class)">
    <slot />
  </Ark.Area>
</template>
