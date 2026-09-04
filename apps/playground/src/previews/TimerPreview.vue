<script setup lang="ts">
import { timer, variantValues } from "@75neo/themes";
import { Timer } from "@75neo/vue";

const sizes = variantValues(timer, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Timer :size="size" :controls="false" :start-ms="12 * 60 * 1000 + 34 * 1000" />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>countdown</p>
      <Timer countdown :start-ms="5 * 60 * 1000" :target-ms="0" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>labels</p>
      <Timer
        :units="['hours', 'minutes', 'seconds']"
        :labels="{ hours: 'hrs', minutes: 'min', seconds: 'sec' }"
        separator="."
      />
    </div>
  </div>
</template>
