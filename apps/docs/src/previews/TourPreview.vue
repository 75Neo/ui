<script setup lang="ts">
import { Tour, useTour } from "@75neo/vue/tour";

const steps = [
  {
    id: "welcome",
    type: "dialog" as const,
    title: "Welcome!",
    description: "A quick walk over the page.",
    actions: [{ label: "Start", action: "next" as const }],
  },
  {
    id: "done",
    type: "dialog" as const,
    title: "All set!",
    description: "That was the whole tour.",
    actions: [{ label: "Finish", action: "dismiss" as const }],
  },
];

const tour = useTour({ steps });
</script>

<template>
  <div>
    <button type="button" @click="tour.start()">Start tour</button>
    <Tour :tour="tour" />
  </div>
</template>
