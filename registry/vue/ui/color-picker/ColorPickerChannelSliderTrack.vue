<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerChannelSliderTrackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerChannelSliderTrackProps>();
</script>

<template>
  <Ark.ChannelSliderTrack :class="cn(styles.channelSliderTrack(), props.class)" />
</template>
