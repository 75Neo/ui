<script setup lang="ts">
import { Tour as Ark } from "@ark-ui/vue/tour";
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
    data-slot="tour-control"
    :class="cn('mt-2 flex items-center gap-2', props.class as string | undefined)"
  >
    <slot />
  </Ark.Control>
</template>
