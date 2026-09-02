<script setup lang="ts">
import { ref } from "vue";
import { TableOfContents } from "@75neo/vue";

/**
 * Ids are global to the page, and this playground renders the same specimen twice, so
 * every id here is prefixed. The rail tracks headings inside its own scroller rather
 * than the page, which is what `scrollEl` is for.
 */
const sections = [
  { value: "vue-install", depth: 2, label: "Install" },
  { value: "vue-package-manager", depth: 3, label: "Package manager" },
  { value: "vue-peer-deps", depth: 3, label: "Peer dependencies" },
  { value: "vue-theme", depth: 2, label: "Import the theme" },
  { value: "vue-cascade", depth: 2, label: "The cascade" },
  { value: "vue-tokens", depth: 3, label: "Tokens" },
  { value: "vue-layers", depth: 3, label: "Theme layers" },
  { value: "vue-types", depth: 2, label: "Type safety" },
];

const scroller = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_11rem]">
    <div ref="scroller" class="h-64 min-w-0 overflow-y-auto rounded-lg border border-muted p-4">
      <section v-for="section in sections" :key="section.value" class="mb-6 last:mb-0">
        <h2
          :id="section.value"
          class="text-sm font-semibold text-highlighted"
          :data-depth="section.depth"
        >
          {{ section.label }}
        </h2>
        <div class="mt-2 flex flex-col gap-1.5">
          <div v-for="line in 6" :key="line" class="h-2 rounded-full bg-elevated" />
        </div>
      </section>
    </div>

    <TableOfContents :items="sections" :scroll-el="() => scroller" />
  </div>
</template>
