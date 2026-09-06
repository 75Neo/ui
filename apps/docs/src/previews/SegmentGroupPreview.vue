<script setup lang="ts">
import { SegmentGroup } from "@75neo/vue/segment-group";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];
</script>

<template>
  <div class="max-w-xs">
    <SegmentGroup :items="items" default-value="week" />
  </div>
</template>
