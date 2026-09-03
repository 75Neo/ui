<script setup lang="ts">
import { Container, Footer, Header, Main } from "@75neo/vue";

/* The recipe measures against the real viewport, which a framed specimen has to cap. */
const frame = "relative h-72 transform-gpu overflow-hidden rounded-lg ring ring-default";
</script>

<template>
  <div :class="frame">
    <div class="flex h-full flex-col overflow-y-auto">
      <Header title="75NeoUI" to="#" />
      <Main :ui="{ base: 'min-h-0 flex-1' }">
        <Container class="py-6 text-sm text-muted">
          One paragraph, and the Footer is still at the bottom.
        </Container>
      </Main>
      <Footer>
        <template #left>
          <span class="text-sm text-muted">© 2026 75NeoUI</span>
        </template>
      </Footer>
    </div>
  </div>
</template>
