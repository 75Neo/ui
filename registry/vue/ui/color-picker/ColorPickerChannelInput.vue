<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { ColorPickerChannelInputProps as ArkChannelInputProps } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerChannelInputProps {
  channel: ArkChannelInputProps["channel"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerChannelInputProps>();
</script>

<template>
  <Ark.ChannelInput :channel="props.channel" :class="cn(styles.channelInput(), props.class)" />
</template>
