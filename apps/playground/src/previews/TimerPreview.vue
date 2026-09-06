<script setup lang="ts">
import { Timer } from "@75neo/vue/timer";
import { timerSchema } from "@75neo/themes";

const sizes = timerSchema.size.values;
const units = ["hours", "minutes", "seconds"] as const;
const labels = { minutes: "min", seconds: "sec" };

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-start gap-6";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Timer :size="size" :target-ms="90000" countdown />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>units</p>
        <div :class="rowItems">
          <Timer :units="[...units]" :start-ms="3600000" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>labels</p>
        <div :class="rowItems">
          <Timer :labels="labels" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>bare</p>
        <div :class="rowItems">
          <Timer :show-labels="false" :controls="false" auto-start />
        </div>
      </div>
    </div>
  </div>
</template>
