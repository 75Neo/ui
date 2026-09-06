<script setup lang="ts">
import { computed } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cva } from "class-variance-authority";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardControl = cva(
  "flex min-w-0 items-center gap-2 rounded-md bg-default ring ring-accented ring-inset",
  {
    variants: { size: clipboardSizeData.control },
    defaultVariants: clipboardDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useClipboardVariants();
const controlClass = computed(() =>
  cn(clipboardControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="clipboard-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
