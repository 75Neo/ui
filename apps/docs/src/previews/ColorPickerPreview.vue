<script setup lang="ts">
import { ColorPicker, parseColor } from "@75neo/vue";

const presets = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"];
</script>

<template>
  <ColorPicker
    label="Brand color"
    alpha
    :swatches="presets"
    :default-value="parseColor('#3b82f6')"
  />
</template>
