<script setup lang="ts">
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
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
    data-slot="radio-group-legend"
    :class="
      cn(
        'font-medium text-highlighted select-none group-data-[orientation=horizontal]/radio:sr-only',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Label>
</template>
