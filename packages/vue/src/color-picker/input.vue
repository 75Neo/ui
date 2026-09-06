<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerInput = cva(
  "min-w-0 flex-1 rounded-md bg-default font-mono text-toned uppercase ring ring-accented outline-none ring-inset focus-visible:ring-2 disabled:cursor-not-allowed",
  {
    variants: { size: colorPickerSizeData.input },
    defaultVariants: colorPickerDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() => cn(colorPickerInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.ChannelInput data-slot="color-picker-input" :class="cls" channel="hex" />
</template>
