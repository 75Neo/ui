<script setup lang="ts">
import { Splitter } from "@75neo/vue/splitter";
import { splitterSchema } from "@75neo/themes";

const sizes = splitterSchema.size.values;

const pair = [
  { id: "left", content: "Left", minSize: 20 },
  { id: "right", content: "Right", minSize: 20 },
];

const trio = [
  { id: "a", content: "A", minSize: 15 },
  { id: "b", content: "B", minSize: 15 },
  { id: "c", content: "C", minSize: 15 },
];

const locked = [pair[0], { ...pair[1], disabled: true }];

const frame =
  "h-28 rounded-lg ring ring-default ring-inset [&_[data-slot=splitter-panel]]:grid [&_[data-slot=splitter-panel]]:place-items-center";

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
          <Splitter :size="size" :panels="pair" :class="frame" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>three</p>
        <div :class="rowItems">
          <Splitter :panels="trio" :class="frame" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <Splitter orientation="vertical" :panels="pair" :class="`${frame} h-40`" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Splitter :panels="locked" :class="frame" />
        </div>
      </div>
    </div>
  </div>
</template>
