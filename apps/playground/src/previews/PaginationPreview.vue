<script setup lang="ts">
import { ref } from "vue";
import { pagination, variantValues } from "@75neo/themes";
import { Pagination } from "@75neo/vue";

const sizes = variantValues(pagination, "size");
const colors = variantValues(pagination, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const page = ref(4);

function pageHref(to: number) {
  return `#page-${to}`;
}
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Pagination :size="size" :count="200" :default-page="4" />
    </div>

    <hr class="border-muted" />

    <!-- The accent fills the current page and nothing else. -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <Pagination :color="accent" size="sm" :count="200" :default-page="4" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-col gap-5">
      <!-- `count` is how many things there are, not how many pages. -->
      <Pagination :count="95" :page-size="10" :default-page="5" edges />
      <Pagination :count="200" :sibling-count="2" :boundary-count="2" :default-page="10" />
      <Pagination :count="200" :sibling-count="0" :boundary-count="1" :default-page="10" />
      <Pagination :count="30" :default-page="1" />

      <!-- With addresses the pages are anchors, so a crawler can follow them. -->
      <Pagination :count="200" :default-page="4" :href="pageHref" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-center gap-4">
      <Pagination v-model:page="page" :count="200" edges />
      <output class="font-mono text-sm text-toned">page {{ page }}</output>
    </div>
  </div>
</template>
