<script setup lang="ts">
import { Star } from "@lucide/vue";
import { Toggle, ToggleIndicator } from "@/components/vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Toggle>
      <ToggleIndicator>
        <Star />
      </ToggleIndicator>
      Watch
    </Toggle>

    <Toggle default-pressed>Pressed</Toggle>
    <Toggle disabled>Disabled</Toggle>
  </div>
</template>
