<script setup lang="ts">
import { computed } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cva } from "class-variance-authority";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardInput = cva(
  "min-w-0 flex-1 truncate bg-transparent font-mono text-toned outline-none",
  {
    variants: { size: clipboardSizeData.input },
    defaultVariants: clipboardDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useClipboardVariants();
const inputClass = computed(() => cn(clipboardInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Input data-slot="clipboard-input" :class="inputClass" />
</template>
