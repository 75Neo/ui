<script setup lang="ts">
import { Footer } from "@75neo/vue/footer";
</script>

<template>
  <div class="overflow-hidden rounded-lg ring ring-default ring-inset">
    <Footer>
      <template #start><span>© 2026 75Neo</span></template>
      <template #center>
        <nav class="flex gap-3 text-sm text-toned">
          <a href="#docs">Docs</a>
          <a href="#github">GitHub</a>
        </nav>
      </template>
      <template #end><span class="text-sm text-muted">MIT</span></template>
    </Footer>
  </div>
</template>
