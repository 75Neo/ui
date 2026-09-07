<script setup lang="ts">
import { Star } from "@lucide/vue";
import Toggle from "@/registry/vue/ui/toggle/Toggle.vue";
import ToggleIndicator from "@/registry/vue/ui/toggle/ToggleIndicator.vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Toggle v-for="size in sizes" :key="size" :size="size">
      <ToggleIndicator>
        <Star />
      </ToggleIndicator>
      Watch
    </Toggle>

    <Toggle default-pressed>Pressed</Toggle>
    <Toggle disabled>Disabled</Toggle>
  </div>
</template>
