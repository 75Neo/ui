<script setup lang="ts">
import { Clipboard } from "@75neo/vue/clipboard";
import { clipboardSchema } from "@75neo/themes";
import { Star } from "@lucide/vue";

const sizes = clipboardSchema.size.values;
const colors = clipboardSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Clipboard :size="size" value="pnpm add @75neo/vue" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <Clipboard v-for="color in colors" :key="color" :color="color" :value="color" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>label</p>
        <div :class="rowItems">
          <Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>icons</p>
        <div :class="rowItems">
          <Clipboard value="starred" :copy-icon="Star" :copied-icon="Star" />
        </div>
      </div>
    </div>
  </div>
</template>
