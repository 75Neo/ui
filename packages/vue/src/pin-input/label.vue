<script setup lang="ts">
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label
    data-slot="pin-input-label"
    :class="cn('font-medium text-highlighted select-none', props.class as string | undefined)"
  >
    <slot />
  </Ark.Label>
</template>
