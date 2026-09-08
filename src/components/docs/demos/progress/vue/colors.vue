<script setup lang="ts">
import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText,
} from "@/components/vue";

const colors = ["primary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Progress
      v-for="(color, index) in colors"
      :key="color"
      :color="color"
      :default-value="30 + index * 15"
    >
      <div class="flex items-baseline justify-between gap-4">
        <ProgressLabel>{{ color }}</ProgressLabel>
        <ProgressValueText />
      </div>
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </Progress>
  </div>
</template>
