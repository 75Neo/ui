<script setup lang="ts">
import { RatingGroup } from "@75neo/vue/rating-group";
import { ratingGroupSchema } from "@75neo/themes";

const sizes = ratingGroupSchema.size.values;
const colors = ratingGroupSchema.color.values;

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
          <RatingGroup :size="size" label="Quality" :default-value="3" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <RatingGroup v-for="color in colors" :key="color" :color="color" :default-value="3" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>halves</p>
        <div :class="rowItems">
          <RatingGroup allow-half :default-value="2.5" label="Quality" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <RatingGroup :default-value="3" disabled />
        </div>
      </div>
    </div>
  </div>
</template>
