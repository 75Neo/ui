<script setup lang="ts">
import { AngleSlider } from "@75neo/vue/angle-slider";
import { angleSliderSchema } from "@75neo/themes";

const sizes = angleSliderSchema.size.values;
const colors = angleSliderSchema.color.values;
const markers = [0, 45, 90, 135, 180, 225, 270, 315];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-4";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>sizes</p>
        <div :class="rowItems">
          <AngleSlider
            v-for="size in sizes"
            :key="size"
            :size="size"
            :model-value="135"
            show-value
            label="Heading"
          />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <AngleSlider
            v-for="color in colors"
            :key="color"
            :color="color"
            size="sm"
            :model-value="225"
            show-value
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>markers</p>
        <div :class="rowItems">
          <AngleSlider :model-value="90" :markers="markers" show-value />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <AngleSlider :model-value="45" show-value disabled />
        </div>
      </div>
    </div>
  </div>
</template>
