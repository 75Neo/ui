<script setup lang="ts">
import { NavigationMenu } from "@75neo/vue/navigation-menu";

const items = [
  {
    value: "components",
    label: "Components",
    links: [
      { href: "#button", title: "Button", description: "The one every page has" },
      { href: "#select", title: "Select", description: "A list that opens on demand" },
    ],
  },
  { value: "docs", label: "Docs", href: "#docs" },
];
</script>

<template>
  <NavigationMenu :items="items" />
</template>
