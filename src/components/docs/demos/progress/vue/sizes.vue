<script setup lang="ts">
import {
  Progress,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText,
} from "@/components/vue";

const bars = [
  { size: "sm", label: "Downloading grammars", value: 24 },
  { size: "md", label: "Writing components", value: 62 },
  { size: "lg", label: "Building the registry", value: 91 },
] as const;
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <Progress v-for="bar in bars" :key="bar.size" :size="bar.size" :default-value="bar.value">
      <div class="flex items-baseline justify-between gap-4">
        <ProgressLabel>{{ bar.label }}</ProgressLabel>
        <ProgressValueText />
      </div>
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </Progress>
  </div>
</template>
