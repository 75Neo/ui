<script setup lang="ts">
import { NumberInput } from "@75neo/vue/number-input";
</script>

<template>
  <div class="max-w-xs">
    <NumberInput label="Quantity" :default-value="4" :min="0" :max="10" />
  </div>
</template>
