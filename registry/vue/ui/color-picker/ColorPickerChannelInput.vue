<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { ExtendedColorChannel } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerChannelInputProps {
  channel: ExtendedColorChannel;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerChannelInputProps>();

const styles = colorPicker();
</script>

<template>
  <Ark.ChannelInput :channel="props.channel" :class="cn(styles.channelInput(), props.class)" />
</template>
