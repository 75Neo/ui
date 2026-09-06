<script setup lang="ts">
import { DateInput } from "@75neo/vue/date-input";
import { dateInputSchema } from "@75neo/themes";

const sizes = dateInputSchema.size.values;
const colors = dateInputSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <DateInput :size="size" label="Birthday" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <DateInput v-for="color in colors" :key="color" :color="color" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>range</p>
        <div :class="rowItems">
          <DateInput selection-mode="range" label="Stay" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <DateInput disabled />
        </div>
      </div>
    </div>
  </div>
</template>
