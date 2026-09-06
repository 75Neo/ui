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
  <Ark.Control
    data-slot="timer-control"
    :class="cn('flex min-w-0 flex-wrap items-center gap-2', props.class as string | undefined)"
  >
    <slot />
  </Ark.Control>
</template>
