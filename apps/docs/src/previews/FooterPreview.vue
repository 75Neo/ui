<script setup lang="ts">
import { Footer } from "@75neo/vue";

const link = "text-muted hover:text-highlighted text-sm transition-colors";
const items = ["Docs", "Components", "Releases"];
</script>

<template>
  <div class="overflow-hidden rounded-lg ring ring-default">
    <Footer>
      <template #left>
        <span class="text-sm text-muted">© 2026 75NeoUI</span>
      </template>

      <span class="font-semibold text-highlighted">75NeoUI</span>

      <template #right>
        <nav class="flex gap-4">
          <a v-for="item in items" :key="item" href="#" :class="link">{{ item }}</a>
        </nav>
      </template>
    </Footer>
  </div>
</template>
