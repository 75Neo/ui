<script setup lang="ts">
import { Marquee } from "@75neo/vue/marquee";

const items = [
  { id: "react", content: "React" },
  { id: "vue", content: "Vue" },
  { id: "svelte", content: "Svelte" },
  { id: "solid", content: "Solid" },
  { id: "angular", content: "Angular" },
];
</script>

<template>
  <Marquee :items="items" edge auto-fill />
</template>
