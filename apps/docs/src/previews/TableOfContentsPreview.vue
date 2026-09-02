<script setup lang="ts">
import { ref } from "vue";
import { TableOfContents } from "@75neo/vue";

/**
 * The specimen watches its own scroller rather than the page, so it does not compete
 * with the rail this page already has, and the ids are prefixed because the page holds
 * both.
 */
const items = [
  { value: "specimen-vue-install", depth: 2, label: "Install" },
  { value: "specimen-vue-manager", depth: 3, label: "Package manager" },
  { value: "specimen-vue-theme", depth: 2, label: "Import the theme" },
  { value: "specimen-vue-cascade", depth: 2, label: "The cascade" },
  { value: "specimen-vue-tokens", depth: 3, label: "Tokens" },
];

const scroller = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-[minmax(0,1fr)_11rem]">
    <div ref="scroller" class="h-56 min-w-0 overflow-y-auto rounded-lg border border-muted p-4">
      <section v-for="item in items" :key="item.value" class="mb-6 last:mb-0">
        <h2 :id="item.value" class="text-sm font-semibold text-highlighted">
          {{ item.label }}
        </h2>
        <div class="mt-2 flex flex-col gap-1.5">
          <div v-for="line in 6" :key="line" class="h-2 rounded-full bg-elevated" />
        </div>
      </section>
    </div>

    <TableOfContents :items="items" :scroll-el="() => scroller" />
  </div>
</template>
