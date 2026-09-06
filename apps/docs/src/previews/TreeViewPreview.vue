<script setup lang="ts">
import { TreeView } from "@75neo/vue/tree-view";

const items = [
  {
    value: "src",
    label: "src",
    children: [{ value: "src-button", label: "button.tsx" }],
  },
  { value: "readme", label: "README.md" },
];
</script>

<template>
  <div class="max-w-xs">
    <TreeView :items="items" label="Files" :default-expanded-value="['src']" />
  </div>
</template>
