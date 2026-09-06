<script setup lang="ts">
import { Slider } from "@75neo/vue/slider";
import { sliderSchema } from "@75neo/themes";

const sizes = sliderSchema.size.values;
const colors = sliderSchema.color.values;

const marks = [
  { value: 0, label: "0" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-1";
const rowItems = "min-w-0 max-w-sm";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Slider :size="size" :model-value="[40]" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="color in colors" :key="color" :class="row">
        <p :class="rowLabel" data-identifier>{{ color }}</p>
        <div :class="rowItems">
          <Slider :color="color" :model-value="[65]" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>label</p>
        <div :class="rowItems">
          <Slider label="Volume" show-value :model-value="[30]" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>range</p>
        <div :class="rowItems">
          <Slider :model-value="[25, 75]" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>marks</p>
        <div :class="rowItems">
          <Slider :model-value="[50]" :marks="marks" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Slider :model-value="[40]" disabled />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <Slider orientation="vertical" :model-value="[40]" class="h-32" />
        </div>
      </div>
    </div>
  </div>
</template>
