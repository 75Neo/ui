<script setup lang="ts">
import { Carousel } from "@75neo/vue";

const items = [
  { id: "recipe", content: "The recipe" },
  { id: "theme", content: "Theme layers" },
  { id: "ui", content: "The ui prop" },
  { id: "class", content: "class at the call site" },
];
</script>

<template>
  <Carousel
    :items="items"
    loop
    allow-mouse-drag
    :ui="{ item: 'grid h-32 place-items-center text-sm text-highlighted' }"
  />
</template>
