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
  <Ark.Control
    data-slot="date-picker-control"
    :class="
      cn(
        'flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Control>
</template>
