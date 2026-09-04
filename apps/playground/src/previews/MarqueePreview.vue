<script setup lang="ts">
import { marquee, variantValues, type MarqueeItem } from "@75neo/themes";
import { Marquee } from "@75neo/vue";

const sizes = variantValues(marquee, "size");
const speeds = variantValues(marquee, "speed");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

function toItems(words: string[]): MarqueeItem[] {
  return words.map((word) => ({ id: word, content: word }));
}

const tickers = toItems(["75NeoUI", "React", "Vue", "Ark UI", "Tailwind", "tokens", "cascade"]);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Marquee :size="size" :items="tickers" />
    </div>

    <hr class="border-muted" />

    <div v-for="speed in speeds" :key="speed" :class="row">
      <p :class="rowLabel" data-identifier>{{ speed }}</p>
      <Marquee :speed="speed" :items="tickers" />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>edges</p>
      <Marquee edge pause-on-interaction :items="tickers" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <div class="max-w-48">
        <Marquee side="bottom" :items="tickers" />
      </div>
    </div>
  </div>
</template>
