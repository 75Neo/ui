<script setup lang="ts">
import { NumberInput } from "@75neo/vue";
</script>

<template>
  <NumberInput label="Guests" :min="1" :max="12" default-value="2" />
</template>
