<script setup lang="ts">
import { Header } from "@75neo/vue";

const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
const link = "text-muted hover:text-highlighted text-sm transition-colors";
const items = ["Docs", "Components", "Themes", "Releases"];
const lines = Array.from({ length: 8 }, (_, at) => at);
const sides = ["end", "start"] as const;

/*
 * The frame is `transform-gpu`, which makes it the containing block for anything
 * `fixed` inside it, and the menu is rendered with `:portal="false"` so it stays in the
 * frame rather than covering the playground. In a real page both are the other way
 * round and the menu fills the viewport.
 */
const frame = "relative h-72 transform-gpu overflow-hidden rounded-lg ring ring-default";
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="side in sides" :key="side" class="flex flex-col gap-2">
      <p :class="label" data-identifier>toggle at the {{ side }}</p>
      <div :class="frame">
        <div class="h-full overflow-y-auto">
          <Header title="75NeoUI" to="#" :toggle-side="side" :portal="false">
            <nav class="flex gap-4">
              <a v-for="item in items" :key="item" href="#" :class="link">{{ item }}</a>
            </nav>

            <template #right>
              <span :class="link">Sign in</span>
            </template>

            <template #body>
              <nav class="flex flex-col gap-3">
                <a v-for="item in items" :key="item" href="#" class="text-base text-highlighted">
                  {{ item }}
                </a>
              </nav>
            </template>
          </Header>

          <div class="mx-auto flex max-w-page flex-col gap-4 px-5 py-6 sm:px-8 lg:px-12">
            <p v-for="at in lines" :key="at" class="text-sm text-muted">
              The bar is sticky, so scrolling this column leaves it where it is.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
