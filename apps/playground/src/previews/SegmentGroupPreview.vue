<script setup lang="ts">
import { ref } from "vue";
import { segmentGroup, variantValues } from "@75neo/themes";
import { SegmentGroup } from "@75neo/vue";

const sizes = variantValues(segmentGroup, "size");
const colors = variantValues(segmentGroup, "color");
const orientations = variantValues(segmentGroup, "orientation");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const views = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const scoped = [
  { value: "all", label: "All" },
  { value: "mine", label: "Mine" },
  { value: "archived", label: "Archived", disabled: true },
];

const view = ref<string | undefined>("week");
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <div><SegmentGroup :size="size" :items="views" default-value="week" /></div>
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the chosen option's text. The pill stays the surface colour, so
      the row reads as one control with a position in it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <div>
        <SegmentGroup :color="accent" size="sm" :items="views" default-value="week" />
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-start gap-6">
      <SegmentGroup
        v-for="orientation in orientations"
        :key="orientation"
        :orientation="orientation"
        :items="views"
        default-value="day"
      />
      <SegmentGroup :items="scoped" default-value="all" />
      <SegmentGroup :items="views" disabled default-value="month" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-center gap-4">
      <SegmentGroup v-model="view" :items="views" />
      <output class="font-mono text-sm text-toned">{{ view ?? "nothing" }}</output>
    </div>
  </div>
</template>
