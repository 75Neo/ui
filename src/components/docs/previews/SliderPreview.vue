<script setup lang="ts">
import Slider from "@/registry/vue/ui/slider/Slider.vue";
import SliderControl from "@/registry/vue/ui/slider/SliderControl.vue";
import SliderHiddenInput from "@/registry/vue/ui/slider/SliderHiddenInput.vue";
import SliderLabel from "@/registry/vue/ui/slider/SliderLabel.vue";
import SliderRange from "@/registry/vue/ui/slider/SliderRange.vue";
import SliderThumb from "@/registry/vue/ui/slider/SliderThumb.vue";
import SliderTrack from "@/registry/vue/ui/slider/SliderTrack.vue";
import SliderValueText from "@/registry/vue/ui/slider/SliderValueText.vue";
</script>

<template>
  <div class="flex max-w-md flex-col gap-8">
    <Slider :default-value="[40]">
      <div class="flex items-baseline justify-between gap-4">
        <SliderLabel>Corner radius</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>

    <Slider :default-value="[20, 80]">
      <div class="flex items-baseline justify-between gap-4">
        <SliderLabel>Container width</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb v-for="index in [0, 1]" :key="index" :index="index">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  </div>
</template>
