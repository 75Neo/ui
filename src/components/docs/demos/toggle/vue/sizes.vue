<script setup lang="ts">
import { Toggle } from "@/components/vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Toggle v-for="size in sizes" :key="size" :size="size" default-pressed>
      {{ size }}
    </Toggle>
  </div>
</template>
