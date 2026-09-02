<script setup lang="ts">
import { clipboard, variantValues } from "@75neo/themes";
import { Clipboard } from "@75neo/vue";

const sizes = variantValues(clipboard, "size");
const colors = variantValues(clipboard, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Clipboard :size="size" :value="`pnpm add @75neo/vue --size ${size}`" />
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <Clipboard :color="color" :value="`--ui-${color}: var(--color-teal-600);`" />
    </div>

    <hr class="border-muted" />

    <Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" color="primary" />
  </div>
</template>
