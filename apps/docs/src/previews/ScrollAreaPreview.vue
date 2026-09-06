<script setup lang="ts">
import { ScrollArea } from "@75neo/vue/scroll-area";

const lines = Array.from({ length: 14 }, (_, index) => `Line ${index + 1}`);
</script>

<template>
  <ScrollArea class="h-32 w-full max-w-xs rounded-lg ring ring-default ring-inset">
    <div class="flex flex-col gap-2 p-3 text-sm text-toned">
      <p v-for="line in lines" :key="line">{{ line }}</p>
    </div>
  </ScrollArea>
</template>
