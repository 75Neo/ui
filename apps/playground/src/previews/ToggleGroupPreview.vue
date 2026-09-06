<script setup lang="ts">
import { ToggleGroup } from "@75neo/vue/toggle-group";
import { toggleGroupSchema } from "@75neo/themes";

const variants = toggleGroupSchema.variant.values;
const colors = toggleGroupSchema.color.values;
const sizes = toggleGroupSchema.size.values;

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <ToggleGroup :variant="variant" :items="items" default-value="week" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col items-start gap-2']">
          <ToggleGroup
            v-for="color in colors"
            :key="color"
            :color="color"
            :items="items"
            default-value="week"
          />
        </div>
      </div>

      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <ToggleGroup :size="size" :items="items" default-value="week" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <ToggleGroup :items="items" orientation="vertical" default-value="week" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>multiple</p>
        <div :class="rowItems">
          <ToggleGroup :items="items" multiple :default-value="['day', 'month']" />
        </div>
      </div>
    </div>
  </div>
</template>
