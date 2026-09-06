<script setup lang="ts">
import { Timer as Ark } from "@ark-ui/vue/timer";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Area
    data-slot="timer-area"
    :class="cn('flex min-w-0 items-center gap-2', props.class as string | undefined)"
  >
    <slot />
  </Ark.Area>
</template>
