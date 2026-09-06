<script setup lang="ts">
import { Select } from "@75neo/vue/select";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
</script>

<template>
  <div class="max-w-xs">
    <Select :items="items" label="Framework" placeholder="Select" />
  </div>
</template>
