<script setup lang="ts">
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Table
    data-slot="date-picker-table"
    :class="cn('w-full border-separate border-spacing-0.5', props.class as string | undefined)"
  >
    <slot />
  </Ark.Table>
</template>
