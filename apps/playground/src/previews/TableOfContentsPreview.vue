<script setup lang="ts">
import { TableOfContents } from "@75neo/vue/table-of-contents";
import { tableOfContentsSchema, type TableOfContentsEntry } from "@75neo/themes";

const sizes = tableOfContentsSchema.size.values;
const colors = tableOfContentsSchema.color.values;

const headings: TableOfContentsEntry[] = [
  { value: "install", depth: 2, label: "Install" },
  { value: "options", depth: 3, label: "Options" },
  { value: "usage", depth: 2, label: "Usage" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <TableOfContents :size="size" :items="headings" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <TableOfContents v-for="color in colors" :key="color" :color="color" :items="headings" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>no title</p>
        <div :class="rowItems">
          <TableOfContents :items="headings" title="" />
        </div>
      </div>
    </div>
  </div>
</template>
