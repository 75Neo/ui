<script setup lang="ts">
import { Container, Footer, Header, Main } from "@75neo/vue";

const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
const frame = "relative h-96 transform-gpu overflow-hidden rounded-lg ring ring-default";

const pages = [
  { name: "short page", lines: 1 },
  { name: "long page", lines: 8 },
];
</script>

<template>
  <!--
    What the Main is for, in one picture: two pages with the same chrome, one with a
    paragraph in it and one with eight. The Footer is at the bottom of the frame in both
    rather than halfway up the short one, because the Main claims what the Header leaves.

    The recipe measures that against `dvh`, which is the real viewport and not this
    frame, so the preview swaps the rule for the flex equivalent at frame scale. Every
    other class is the recipe's own.
  -->
  <div class="grid gap-6 @2xl:grid-cols-2">
    <div v-for="page in pages" :key="page.name" class="flex flex-col gap-2">
      <p :class="label" data-identifier>{{ page.name }}</p>
      <div :class="frame">
        <div class="flex h-full flex-col overflow-y-auto">
          <Header title="75NeoUI" to="#" />

          <Main :ui="{ base: 'min-h-0 flex-1' }">
            <Container class="flex flex-col gap-4 py-6">
              <p v-for="at in page.lines" :key="at" class="text-sm text-muted">
                The Main is at least the viewport less the Header, so the Footer sits at the bottom
                whatever is above it.
              </p>
            </Container>
          </Main>

          <Footer>
            <template #left>
              <span class="text-sm text-muted">© 2026 75NeoUI</span>
            </template>
          </Footer>
        </div>
      </div>
    </div>
  </div>
</template>
