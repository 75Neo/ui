<script setup lang="ts">
import { TableOfContents } from "@75neo/vue/table-of-contents";

const items = [
  { value: "install", depth: 2, label: "Install" },
  { value: "usage", depth: 2, label: "Usage" },
  { value: "api", depth: 2, label: "API" },
];
</script>

<template>
  <div class="max-w-xs">
    <TableOfContents :items="items" />
  </div>
</template>
