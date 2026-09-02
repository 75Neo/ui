<script setup lang="ts">
import { Checkbox } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Checkbox label="Remember this device" default-checked />
    <Checkbox
      label="Weekly digest"
      description="One email on Monday with everything that changed."
      color="success"
    />
    <Checkbox label="Partially selected" default-checked="indeterminate" size="lg" />
  </div>
</template>
