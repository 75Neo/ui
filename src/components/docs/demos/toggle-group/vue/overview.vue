<script setup lang="ts">
import { AlignCenter, AlignLeft, AlignRight } from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@/components/vue";

const alignments = [
  { value: "left", icon: AlignLeft, label: "Align left" },
  { value: "center", icon: AlignCenter, label: "Align centre" },
  { value: "right", icon: AlignRight, label: "Align right" },
];
</script>

<template>
  <ToggleGroup :default-value="['center']">
    <ToggleGroupItem
      v-for="alignment in alignments"
      :key="alignment.value"
      :value="alignment.value"
      :aria-label="alignment.label"
    >
      <component :is="alignment.icon" class="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
