<script setup lang="ts">
import { Header } from "@75neo/vue";

const link = "text-muted hover:text-highlighted text-sm transition-colors";
const items = ["Docs", "Components", "Releases"];
const lines = Array.from({ length: 6 }, (_, at) => at);

/* `transform-gpu` makes the frame the containing block for the menu's own `fixed`. */
const frame = "relative h-64 transform-gpu overflow-hidden rounded-lg ring ring-default";
</script>

<template>
  <div :class="frame">
    <div class="h-full overflow-y-auto">
      <Header title="75NeoUI" to="#" :portal="false">
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
</template>
