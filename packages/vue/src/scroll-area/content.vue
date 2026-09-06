<script setup lang="ts">
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Content
    data-slot="scroll-area-content"
    :class="cn('min-w-0', props.class as string | undefined)"
  >
    <slot />
  </Ark.Content>
</template>
