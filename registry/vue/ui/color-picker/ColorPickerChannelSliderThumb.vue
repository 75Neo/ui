<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerChannelSliderThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerChannelSliderThumbProps>();
</script>

<template>
  <Ark.ChannelSliderThumb :class="cn(styles.channelSliderThumb(), props.class)" />
</template>
