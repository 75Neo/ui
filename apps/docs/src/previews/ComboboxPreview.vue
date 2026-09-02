<script setup lang="ts">
import { Combobox } from "@75neo/vue";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
];
</script>

<template>
  <Combobox label="Language" :items="languages" open-on-click placeholder="Start typing" />
</template>
