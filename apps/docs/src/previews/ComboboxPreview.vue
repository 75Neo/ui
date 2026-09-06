<script setup lang="ts">
import { Combobox } from "@75neo/vue/combobox";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
</script>

<template>
  <div class="max-w-xs">
    <Combobox :items="items" label="Framework" placeholder="Type to filter" />
  </div>
</template>
