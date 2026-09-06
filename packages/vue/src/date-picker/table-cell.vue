<script setup lang="ts">
import { DatePicker as Ark, type DateValue } from "@ark-ui/vue/date-picker";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
  value: number | DateValue;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.TableCell
    data-slot="date-picker-table-cell"
    :class="cn('p-0', props.class as string | undefined)"
    :value="props.value"
  >
    <slot />
  </Ark.TableCell>
</template>
