<script setup lang="ts">
import { NumberInput } from "@75neo/vue/number-input";
import { numberInputSchema } from "@75neo/themes";

const sizes = numberInputSchema.size.values;
const colors = numberInputSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>orientations</p>
        <div :class="rowItems">
          <NumberInput default-value="4" label="Quantity" />
        </div>
      </div>
      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <NumberInput default-value="4" orientation="vertical" label="Quantity" />
        </div>
      </div>
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <NumberInput :size="size" default-value="4" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <NumberInput v-for="color in colors" :key="color" :color="color" default-value="4" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>bounds</p>
        <div :class="rowItems">
          <NumberInput default-value="4" :min="0" :max="10" label="0 to 10" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <NumberInput default-value="4" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
