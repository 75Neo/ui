<script setup lang="ts">
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import { cn, type SplitterPanelProps } from "@75neo/themes";

const props = defineProps<
  SplitterPanelProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Panel
    :id="props.id"
    data-slot="splitter-panel"
    :class="
      cn(
        'min-h-0 min-w-0 overflow-auto data-dragging:select-none',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Panel>
</template>
