<script setup lang="ts">
import { Carousel } from "@75neo/vue/carousel";

const items = [
  { id: "one", content: "Slide one" },
  { id: "two", content: "Slide two" },
  { id: "three", content: "Slide three" },
];
</script>

<template>
  <Carousel
    :items="items"
    class="w-full max-w-sm [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-32 [&_[data-slot=carousel-item]]:place-items-center"
  />
</template>
