<script setup lang="ts">
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.ChannelSliderTrack
    data-slot="color-picker-channel-slider-track"
    :class="cn('size-full rounded-[inherit]', props.class as string | undefined)"
  />
</template>
