<script setup lang="ts">
import { Slider } from "@75neo/vue/slider";
</script>

<template>
  <Slider class="max-w-sm" label="Volume" show-value :model-value="[40]" />
</template>
