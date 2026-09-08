<script setup lang="ts">
import { Toggle } from "@/components/vue";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Toggle v-for="color in colors" :key="color" :color="color" default-pressed>
      {{ color }}
    </Toggle>
  </div>
</template>
