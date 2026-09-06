<script setup lang="ts">
import { Listbox } from "@75neo/vue/listbox";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
</script>

<template>
  <div class="max-w-xs">
    <Listbox :items="items" label="Framework" :default-value="['react']" />
  </div>
</template>
