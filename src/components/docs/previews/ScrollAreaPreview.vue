<script setup lang="ts">
import ScrollArea from "@/registry/vue/ui/scroll-area/ScrollArea.vue";
import ScrollAreaContent from "@/registry/vue/ui/scroll-area/ScrollAreaContent.vue";
import ScrollAreaScrollbar from "@/registry/vue/ui/scroll-area/ScrollAreaScrollbar.vue";
import ScrollAreaThumb from "@/registry/vue/ui/scroll-area/ScrollAreaThumb.vue";
import ScrollAreaViewport from "@/registry/vue/ui/scroll-area/ScrollAreaViewport.vue";

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
