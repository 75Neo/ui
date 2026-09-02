<script setup lang="ts">
import { Accordion } from "@75neo/vue";

const items = [
  {
    value: "cascade",
    label: "What sets a component's classes?",
    content:
      "Four layers, folded weakest first: the recipe, the Theme layers above it, the ui prop, then class at the call site.",
  },
  {
    value: "tokens",
    label: "How many tokens does a color spend?",
    content:
      "One. Recipes reach for the same token at a different strength rather than for a second token, so a rebrand is one line per color.",
  },
  {
    value: "frameworks",
    label: "Do the two adapters drift?",
    content:
      "The recipe, the slot names and the props all live in one component module, so both adapters render the same anatomy from the same source.",
  },
];
</script>

<template>
  <Accordion :items="items" collapsible />
</template>
