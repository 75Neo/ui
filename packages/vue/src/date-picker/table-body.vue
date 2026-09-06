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
  <Ark.TableBody data-slot="date-picker-table-body" :class="cn(props.class as string | undefined)">
    <slot />
  </Ark.TableBody>
</template>
