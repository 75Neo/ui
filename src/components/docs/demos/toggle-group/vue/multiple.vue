<script setup lang="ts">
import { Bold, Italic, Underline } from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@/components/vue";

const marks = [
  { value: "bold", icon: Bold, label: "Bold" },
  { value: "italic", icon: Italic, label: "Italic" },
  { value: "underline", icon: Underline, label: "Underline" },
];
</script>

<template>
  <ToggleGroup multiple :default-value="['bold', 'underline']">
    <ToggleGroupItem
      v-for="mark in marks"
      :key="mark.value"
      :value="mark.value"
      :aria-label="mark.label"
    >
      <component :is="mark.icon" class="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
