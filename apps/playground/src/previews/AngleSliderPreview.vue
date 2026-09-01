<script setup lang="ts">
import { ref } from "vue";
import { angleSlider, variantValues } from "@75neo/themes";
import { AngleSlider } from "@75neo/vue";

const sizes = variantValues(angleSlider, "size");
const colors = variantValues(angleSlider, "color");

const ticks = [0, 45, 90, 135, 180, 225, 270, 315];

/*
 * The controlled row is the only place the two value APIs differ -- `v-model` here,
 * `value` and `onValueChange` in the React preview -- so it is worth seeing the two
 * side by side, driving the same readout.
 */
const controlled = ref(120);

/*
 * Kept identical to AngleSliderPreview.tsx on purpose: matching scaffolds are what
 * make a React/Vue divergence visible as a break in the shared rhythm.
 */
const row = "grid gap-3 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const rowItems = "flex flex-wrap items-center gap-6";
const group = "flex flex-col gap-6";
const rule = "border-muted my-7";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>size</p>
        <div :class="rowItems">
          <AngleSlider
            v-for="size in sizes"
            :key="size"
            :size="size"
            :default-value="45"
            show-value
            label="degrees"
          />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>color</p>
        <div :class="rowItems">
          <AngleSlider
            v-for="color in colors"
            :key="color"
            size="sm"
            :color="color"
            :default-value="225"
            :label="color"
          />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>markers</p>
        <div :class="rowItems">
          <AngleSlider :default-value="90" :markers="ticks" show-value />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>step</p>
        <div :class="rowItems">
          <AngleSlider
            :default-value="90"
            :step="15"
            :markers="ticks"
            show-value
            label="15° steps"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>state</p>
        <div :class="rowItems">
          <AngleSlider :default-value="45" disabled show-value label="disabled" />
          <AngleSlider :default-value="45" read-only show-value label="read only" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>controlled</p>
        <div :class="rowItems">
          <AngleSlider v-model="controlled" show-value label="degrees" />
          <p class="font-mono text-xs text-toned" data-identifier>{{ controlled }}°</p>
        </div>
      </div>
    </div>
  </div>
</template>
