<script setup lang="ts">
import { Pagination } from "@75neo/vue/pagination";
import { paginationSchema } from "@75neo/themes";

const sizes = paginationSchema.size.values;
const colors = paginationSchema.color.values;
const pageHref = (page: number) => `#page-${page}`;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Pagination :size="size" :count="96" :default-page="4" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="color in colors" :key="color" :class="row">
        <p :class="rowLabel" data-identifier>{{ color }}</p>
        <div :class="rowItems">
          <Pagination :color="color" :count="48" :default-page="2" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>edges</p>
        <div :class="rowItems">
          <Pagination :count="200" :default-page="7" edges />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>links</p>
        <div :class="rowItems">
          <Pagination :count="48" :default-page="2" :href="pageHref" />
        </div>
      </div>
    </div>
  </div>
</template>
