<script setup lang="ts">
import { computed } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cva } from "class-variance-authority";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardLabel = cva("font-medium text-highlighted", {
  variants: { size: clipboardSizeData.label },
  defaultVariants: clipboardDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useClipboardVariants();
const labelClass = computed(() => cn(clipboardLabel(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Label data-slot="clipboard-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
