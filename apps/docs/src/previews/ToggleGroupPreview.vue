<script setup lang="ts">
import { ToggleGroup } from "@75neo/vue/toggle-group";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];
</script>

<template>
  <div class="max-w-xs">
    <ToggleGroup :items="items" :default-value="['week']" />
  </div>
</template>
