<script setup lang="ts">
import { Clipboard } from "@75neo/vue/clipboard";
</script>

<template>
  <div class="flex max-w-md flex-col gap-2">
    <Clipboard value="pnpm add @75neo/vue" />
    <Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" color="primary" />
  </div>
</template>
