<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerChannelSliderThumb = cva(
  "-translate-1/2 rounded-full shadow-sm ring-2 ring-bg outline-none focus-visible:outline-3",
  {
    variants: { size: colorPickerSizeData.channelSliderThumb },
    defaultVariants: colorPickerDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() =>
  cn(colorPickerChannelSliderThumb(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ChannelSliderThumb data-slot="color-picker-channel-slider-thumb" :class="cls" />
</template>
