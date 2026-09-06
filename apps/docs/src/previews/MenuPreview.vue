<script setup lang="ts">
import { Menu } from "@75neo/vue/menu";

const items = [
  { value: "new", label: "New file" },
  { value: "open", label: "Open…" },
  { value: "save", label: "Save", shortcut: "⌘S" },
];
</script>

<template>
  <Menu :items="items">
    <button type="button">File</button>
  </Menu>
</template>
