<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerChannelSlider = cva("relative touch-none rounded-full ring ring-accented", {
  variants: { size: colorPickerSizeData.channelSlider },
  defaultVariants: colorPickerDefaults,
});

const props = defineProps<{
  class?: unknown;
  /** Which channel this slider edits: hue or alpha. */
  channel: "hue" | "alpha";
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() =>
  cn(colorPickerChannelSlider(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ChannelSlider data-slot="color-picker-channel-slider" :class="cls" :channel="props.channel">
    <slot />
  </Ark.ChannelSlider>
</template>
