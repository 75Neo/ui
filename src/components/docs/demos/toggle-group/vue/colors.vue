<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/vue";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;
</script>

<template>
  <div class="flex flex-col gap-3">
    <ToggleGroup v-for="color in colors" :key="color" :color="color" :default-value="['on']">
      <ToggleGroupItem value="on">{{ color }}</ToggleGroupItem>
      <ToggleGroupItem value="off">off</ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
