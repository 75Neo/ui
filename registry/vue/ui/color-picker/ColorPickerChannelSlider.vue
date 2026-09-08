<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { ColorPickerChannelSliderProps as ArkChannelSliderProps } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerChannelSliderProps {
  channel: ArkChannelSliderProps["channel"];
  orientation?: "horizontal" | "vertical";
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerChannelSliderProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ChannelSlider
    :channel="props.channel"
    :orientation="props.orientation"
    :class="cn(styles.channelSlider(), props.class)"
  >
    <slot />
  </Ark.ChannelSlider>
</template>
