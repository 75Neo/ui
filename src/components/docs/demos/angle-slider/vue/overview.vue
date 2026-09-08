<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderThumb,
  AngleSliderValueText,
} from "@/components/vue";
</script>

<template>
  <div class="flex justify-center">
    <AngleSlider :default-value="135" :step="15">
      <AngleSliderLabel>Gradient angle</AngleSliderLabel>
      <AngleSliderControl>
        <AngleSliderThumb />
      </AngleSliderControl>
      <AngleSliderValueText />
      <AngleSliderHiddenInput />
    </AngleSlider>
  </div>
</template>
