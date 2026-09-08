<script setup lang="ts">
import AngleSlider from "@/registry/vue/ui/angle-slider/AngleSlider.vue";
import AngleSliderControl from "@/registry/vue/ui/angle-slider/AngleSliderControl.vue";
import AngleSliderHiddenInput from "@/registry/vue/ui/angle-slider/AngleSliderHiddenInput.vue";
import AngleSliderLabel from "@/registry/vue/ui/angle-slider/AngleSliderLabel.vue";
import AngleSliderThumb from "@/registry/vue/ui/angle-slider/AngleSliderThumb.vue";
import AngleSliderValueText from "@/registry/vue/ui/angle-slider/AngleSliderValueText.vue";
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
