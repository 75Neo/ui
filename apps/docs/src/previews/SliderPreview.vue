<script setup lang="ts">
import { Slider } from "@75neo/vue";

const marks = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];
</script>

<template>
  <div class="flex flex-col gap-8">
    <Slider label="Volume" show-value :default-value="[65]" />
    <Slider
      label="Budget"
      color="success"
      :default-value="[20, 70]"
      :min-steps-between-thumbs="5"
    />
    <Slider label="Quality" :marks="marks" :step="25" :default-value="[50]" />
  </div>
</template>
