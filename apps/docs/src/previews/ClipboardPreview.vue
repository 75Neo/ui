<script setup lang="ts">
import { Clipboard } from "@75neo/vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <Clipboard value="pnpm add @75neo/vue" />
    <Clipboard
      label="Registry URL"
      value="https://75neo.dev/r/button.json"
      color="primary"
      size="lg"
    />
  </div>
</template>
