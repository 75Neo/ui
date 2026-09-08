<script setup lang="ts">
import { parseColor } from "@ark-ui/vue/color-picker";
import ColorPicker from "@/registry/vue/ui/color-picker/ColorPicker.vue";
import ColorPickerArea from "@/registry/vue/ui/color-picker/ColorPickerArea.vue";
import ColorPickerAreaBackground from "@/registry/vue/ui/color-picker/ColorPickerAreaBackground.vue";
import ColorPickerAreaThumb from "@/registry/vue/ui/color-picker/ColorPickerAreaThumb.vue";
import ColorPickerChannelSlider from "@/registry/vue/ui/color-picker/ColorPickerChannelSlider.vue";
import ColorPickerChannelSliderThumb from "@/registry/vue/ui/color-picker/ColorPickerChannelSliderThumb.vue";
import ColorPickerChannelSliderTrack from "@/registry/vue/ui/color-picker/ColorPickerChannelSliderTrack.vue";
import ColorPickerContent from "@/registry/vue/ui/color-picker/ColorPickerContent.vue";
import ColorPickerControl from "@/registry/vue/ui/color-picker/ColorPickerControl.vue";
import ColorPickerHiddenInput from "@/registry/vue/ui/color-picker/ColorPickerHiddenInput.vue";
import ColorPickerLabel from "@/registry/vue/ui/color-picker/ColorPickerLabel.vue";
import ColorPickerPositioner from "@/registry/vue/ui/color-picker/ColorPickerPositioner.vue";
import ColorPickerSwatch from "@/registry/vue/ui/color-picker/ColorPickerSwatch.vue";
import ColorPickerSwatchGroup from "@/registry/vue/ui/color-picker/ColorPickerSwatchGroup.vue";
import ColorPickerSwatchTrigger from "@/registry/vue/ui/color-picker/ColorPickerSwatchTrigger.vue";
import ColorPickerTrigger from "@/registry/vue/ui/color-picker/ColorPickerTrigger.vue";
import ColorPickerValueSwatch from "@/registry/vue/ui/color-picker/ColorPickerValueSwatch.vue";
import ColorPickerValueText from "@/registry/vue/ui/color-picker/ColorPickerValueText.vue";

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
