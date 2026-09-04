<script setup lang="ts">
import { Splitter } from "@75neo/vue";

const panels = [
  {
    id: "left",
    content: "Left panel (drag the handle to resize)",
    minSize: 20,
  },
  {
    id: "right",
    content: "Right panel",
    minSize: 20,
  },
];

const threePanels = [
  { id: "top", content: "Top panel", minSize: 15 },
  { id: "middle", content: "Middle panel", minSize: 15 },
  { id: "bottom", content: "Bottom panel", minSize: 15 },
];

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div :class="row">
      <p :class="rowLabel" data-identifier>horizontal</p>
      <div class="h-40 rounded-lg border border-default p-2">
        <Splitter orientation="horizontal" :panels="panels" :default-size="[40, 60]">
          <template #panel="{ panel }">
            <div
              class="flex h-full items-center justify-center rounded bg-elevated p-4 text-xs font-medium text-toned"
            >
              {{ panel.content }}
            </div>
          </template>
        </Splitter>
      </div>
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <div class="h-64 rounded-lg border border-default p-2">
        <Splitter orientation="vertical" :panels="threePanels" :default-size="[30, 40, 30]">
          <template #panel="{ panel }">
            <div
              class="flex h-full items-center justify-center rounded bg-elevated p-3 text-xs font-medium text-toned"
            >
              {{ panel.content }}
            </div>
          </template>
        </Splitter>
      </div>
    </div>
  </div>
</template>
