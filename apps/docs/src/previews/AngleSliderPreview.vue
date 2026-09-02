<script setup lang="ts">
import { AngleSlider } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-10">
    <AngleSlider label="Rotation" show-value :default-value="45" />
    <AngleSlider
      label="Snapped"
      show-value
      :default-value="135"
      color="success"
      :step="15"
      :markers="[0, 90, 180, 270]"
    />
  </div>
</template>
