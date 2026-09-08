<script setup lang="ts">
import { parseColor } from "@ark-ui/vue/color-picker";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from "@/components/vue";

const presets = ["#2563eb", "#0f766e", "#7c3aed", "#e11d48", "#f59e0b"];
</script>

<template>
  <div class="max-w-64">
    <ColorPicker :default-value="parseColor('#2563eb')">
      <ColorPickerLabel>Primary</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerTrigger>
          <ColorPickerValueSwatch />
        </ColorPickerTrigger>
        <ColorPickerValueText />
      </ColorPickerControl>

      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea>
            <ColorPickerAreaBackground />
            <ColorPickerAreaThumb />
          </ColorPickerArea>

          <ColorPickerChannelSlider channel="hue">
            <ColorPickerChannelSliderTrack />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSlider>

          <ColorPickerChannelSlider channel="alpha">
            <ColorPickerChannelSliderTrack />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSlider>

          <ColorPickerSwatchGroup>
            <ColorPickerSwatchTrigger v-for="preset in presets" :key="preset" :value="preset">
              <ColorPickerSwatch :value="preset" />
            </ColorPickerSwatchTrigger>
          </ColorPickerSwatchGroup>
        </ColorPickerContent>
      </ColorPickerPositioner>
      <ColorPickerHiddenInput />
    </ColorPicker>
  </div>
</template>
