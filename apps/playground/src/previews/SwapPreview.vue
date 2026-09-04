<script setup lang="ts">
import { ref } from "vue";
import { swap, variantValues } from "@75neo/themes";
import { Swap } from "@75neo/vue";
import { Pause, Play } from "@lucide/vue";

const sizes = variantValues(swap, "size");
const swapped = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <div class="flex items-center gap-4">
        <Swap :size="size" :on-icon="Play" :off-icon="Pause" />
        <Swap :size="size" swap :on-icon="Play" :off-icon="Pause" />
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
        @click="swapped = !swapped"
      >
        {{ swapped ? "Pause it" : "Play it" }}
      </button>
      <Swap :swap="swapped" :on-icon="Play" :off-icon="Pause" />
    </div>
  </div>
</template>
