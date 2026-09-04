<script setup lang="ts">
import { ref } from "vue";
import { toggle, variantValues } from "@75neo/themes";
import { Toggle } from "@75neo/vue";
import { Bold } from "@lucide/vue";

const variants = variantValues(toggle, "variant");
const colors = variantValues(toggle, "color");
const sizes = variantValues(toggle, "size");

const pressed = ref(true);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <!-- Every other cell starts pressed, so both states show in every color. -->
    <div v-for="(variant, rowIndex) in variants" :key="variant" :class="row">
      <p :class="rowLabel" data-identifier>{{ variant }}</p>
      <div class="flex flex-wrap gap-2">
        <Toggle
          v-for="(color, cellIndex) in colors"
          :key="color"
          :variant="variant"
          :color="color"
          :default-pressed="(rowIndex + cellIndex) % 2 === 0"
          :aria-label="`${variant} ${color} toggle`"
        >
          <Bold />
        </Toggle>
      </div>
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>sizes</p>
      <div class="flex flex-wrap items-center gap-2">
        <Toggle
          v-for="size in sizes"
          :key="size"
          :size="size"
          variant="outline"
          color="neutral"
          :aria-label="`${size} toggle`"
        >
          <Bold />
        </Toggle>
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-center gap-2">
      <Toggle v-model:pressed="pressed" aria-label="Controlled toggle">
        <Bold />
      </Toggle>
      <p class="text-sm text-muted">
        Controlled: {{ pressed ? "pressed" : "released" }} — click it
      </p>
      <Toggle variant="soft" color="neutral" disabled aria-label="Disabled toggle">
        <Bold />
      </Toggle>
    </div>
  </div>
</template>
