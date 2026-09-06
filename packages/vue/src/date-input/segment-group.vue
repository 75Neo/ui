<script setup lang="ts">
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
  /** Which date this group edits: the date, or the end of a range. */
  index?: number;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.SegmentGroup
    data-slot="date-input-segment-group"
    :class="cn('flex items-center', props.class as string | undefined)"
    :index="props.index ?? 0"
  >
    <slot />
  </Ark.SegmentGroup>
</template>
