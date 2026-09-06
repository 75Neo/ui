<script setup lang="ts">
import { Select as Ark } from "@ark-ui/vue/select";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemGroupLabel
    data-slot="select-item-group-label"
    :class="cn(props.class as string | undefined)"
  >
    <slot />
  </Ark.ItemGroupLabel>
</template>
