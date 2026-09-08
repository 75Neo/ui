<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@/components/vue";

const colors = ["primary", "success", "warning", "error"] as const;
</script>

<template>
  <div class="flex max-w-md flex-col gap-8">
    <Slider
      v-for="(color, index) in colors"
      :key="color"
      :color="color"
      :default-value="[30 + index * 15]"
    >
      <SliderLabel>{{ color }}</SliderLabel>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  </div>
</template>
