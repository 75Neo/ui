<script setup lang="ts">
import { SegmentGroup } from "@75neo/vue";

const views = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];
</script>

<template>
  <SegmentGroup :items="views" default-value="week" />
</template>
