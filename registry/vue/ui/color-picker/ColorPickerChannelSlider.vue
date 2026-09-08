<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { ColorChannel } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerChannelSliderProps {
  channel: ColorChannel;
  orientation?: "horizontal" | "vertical";
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerChannelSliderProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
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
