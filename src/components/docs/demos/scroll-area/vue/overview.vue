<script setup lang="ts">
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/vue";

const items = [
  "accordion",
  "avatar",
  "button",
  "checkbox",
  "collapsible",
  "combobox",
  "dialog",
  "drawer",
  "editable",
  "field",
  "listbox",
  "menu",
];
</script>

<template>
  <ScrollArea class="h-44 max-w-64 rounded-md ring ring-default">
    <ScrollAreaViewport>
      <ScrollAreaContent class="flex flex-col gap-1 p-3">
        <p v-for="item in items" :key="item" class="font-mono text-xs text-muted">{{ item }}</p>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
  </ScrollArea>
</template>
