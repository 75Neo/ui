<script setup lang="ts">
import { Footer } from "@75neo/vue";

const link = "text-muted hover:text-highlighted text-sm transition-colors";
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

const links = ["Docs", "Components", "Releases"];
</script>

<template>
  <!--
    The row is written into the DOM as right, centre, left and put back in reading order
    by the recipe, so narrowing the frame stacks the links above the copyright rather
    than under it. Drag the pane narrower to watch it happen.
  -->
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <p :class="label" data-identifier>three regions</p>
      <div class="overflow-hidden rounded-lg ring ring-default">
        <Footer>
          <template #left>
            <span class="text-sm text-muted">© 2026 75NeoUI</span>
          </template>
          <span class="font-semibold text-highlighted">75NeoUI</span>
          <template #right>
            <nav class="flex gap-4">
              <a v-for="item in links" :key="item" href="#" :class="link">{{ item }}</a>
            </nav>
          </template>
        </Footer>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <p :class="label" data-identifier>with both bands</p>
      <div class="overflow-hidden rounded-lg ring ring-default">
        <Footer>
          <template #top>
            <div class="bg-muted py-6 text-center text-sm text-muted">
              A full-bleed band, for a newsletter or a grid of columns
            </div>
          </template>
          <template #left>
            <span class="text-sm text-muted">© 2026 75NeoUI</span>
          </template>
          <template #right>
            <nav class="flex gap-4">
              <a v-for="item in links" :key="item" href="#" :class="link">{{ item }}</a>
            </nav>
          </template>
          <template #bottom>
            <div class="border-t border-muted py-4 text-center text-xs text-dimmed">
              Released under the MIT licence
            </div>
          </template>
        </Footer>
      </div>
    </div>
  </div>
</template>
