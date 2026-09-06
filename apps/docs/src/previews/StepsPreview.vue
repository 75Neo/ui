<script setup lang="ts">
import { Steps } from "@75neo/vue/steps";

const items = [
  { title: "Contact", description: "Name and email" },
  { title: "Date", description: "Pick a day" },
  { title: "Rooms", description: "Choose a room" },
];
</script>

<template>
  <Steps :items="items" :default-step="1" />
</template>
