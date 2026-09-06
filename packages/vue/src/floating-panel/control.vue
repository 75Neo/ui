<script setup lang="ts">
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
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
    data-slot="floating-panel-control"
    :class="cn('ms-auto flex shrink-0 items-center gap-1', props.class as string | undefined)"
  >
    <slot />
  </Ark.Control>
</template>
