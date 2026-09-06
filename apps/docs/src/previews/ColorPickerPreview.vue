<script setup lang="ts">
import { ColorPicker, parseColor } from "@75neo/vue/color-picker";
</script>

<template>
  <div class="max-w-xs">
    <ColorPicker label="Brand" :default-value="parseColor('#3b82f6')" />
  </div>
</template>
