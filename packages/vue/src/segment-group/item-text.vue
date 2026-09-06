<script setup lang="ts">
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemText
    data-slot="segment-group-item-text"
    :class="cn('truncate', props.class as string | undefined)"
  >
    <slot />
  </Ark.ItemText>
</template>
