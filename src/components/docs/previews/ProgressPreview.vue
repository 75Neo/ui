<script setup lang="ts">
import Progress from "@/registry/vue/ui/progress/Progress.vue";
import ProgressLabel from "@/registry/vue/ui/progress/ProgressLabel.vue";
import ProgressRange from "@/registry/vue/ui/progress/ProgressRange.vue";
import ProgressTrack from "@/registry/vue/ui/progress/ProgressTrack.vue";
import ProgressValueText from "@/registry/vue/ui/progress/ProgressValueText.vue";

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
