<script setup lang="ts">
import { SegmentGroup as Ark } from "@ark-ui/vue/segment-group";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.Indicator
    data-slot="segment-group-indicator"
    :class="
      cn(
        'absolute top-(--top) left-(--left) -z-10 h-(--height) w-(--width) rounded-sm bg-default shadow-sm',
        props.class as string | undefined,
      )
    "
  />
</template>
