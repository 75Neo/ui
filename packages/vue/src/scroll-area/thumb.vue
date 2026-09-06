<script setup lang="ts">
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.Thumb
    data-slot="scroll-area-thumb"
    :class="
      cn(
        'relative flex-1 rounded-full bg-accented transition-colors hover:bg-inverted/30 data-dragging:bg-inverted/40',
        props.class as string | undefined,
      )
    "
  />
</template>
