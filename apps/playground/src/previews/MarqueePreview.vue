<script setup lang="ts">
import { Marquee } from "@75neo/vue/marquee";
import { marqueeSchema } from "@75neo/themes";

const sizes = marqueeSchema.size.values;
const speeds = marqueeSchema.speed.values;

const items = [
  { id: "react", content: "React" },
  { id: "vue", content: "Vue" },
  { id: "svelte", content: "Svelte" },
  { id: "solid", content: "Solid" },
  { id: "angular", content: "Angular" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "min-w-0";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Marquee :size="size" :items="items" auto-fill />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="speed in speeds" :key="speed" :class="row">
        <p :class="rowLabel" data-identifier>{{ speed }}</p>
        <div :class="rowItems">
          <Marquee :speed="speed" :items="items" auto-fill />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>edge</p>
        <div :class="rowItems">
          <Marquee :items="items" auto-fill edge />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>reverse</p>
        <div :class="rowItems">
          <Marquee :items="items" auto-fill reverse />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>pause</p>
        <div :class="rowItems">
          <Marquee :items="items" auto-fill pause-on-interaction />
        </div>
      </div>
    </div>
  </div>
</template>
