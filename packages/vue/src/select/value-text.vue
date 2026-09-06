<script setup lang="ts">
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
  /** Text to display when no value is selected. */
  placeholder?: string;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ValueText
    data-slot="select-value-text"
    :class="cn('min-w-0 flex-1 truncate', props.class as string | undefined)"
    :placeholder="props.placeholder"
  >
    <slot />
  </Ark.ValueText>
</template>
