<script setup lang="ts">
import { Select } from "@75neo/vue";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
];
</script>

<template>
  <Select label="Language" :items="languages" placeholder="Pick one" />
</template>
