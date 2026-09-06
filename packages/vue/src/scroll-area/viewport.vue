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
  <Ark.Viewport
    data-slot="scroll-area-viewport"
    :class="
      cn(
        'scrollbar-none size-full overflow-auto outline-primary/25 focus-visible:outline-3 [&::-webkit-scrollbar]:hidden',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Viewport>
</template>
