<script setup lang="ts">
import { Steps } from "@75neo/vue/steps";
import { stepsSchema } from "@75neo/themes";

const sizes = stepsSchema.size.values;
const colors = stepsSchema.color.values;

const items = [
  { title: "Contact", description: "Name and email" },
  { title: "Date", description: "Pick a day" },
  { title: "Rooms", description: "Choose a room" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Steps :size="size" :items="items" :default-step="1" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Steps
            v-for="color in colors"
            :key="color"
            :color="color"
            :items="items"
            :default-step="2"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>linear</p>
        <div :class="rowItems">
          <Steps :items="items" linear completed-content="Done — thank you!" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <Steps :items="items" orientation="vertical" />
        </div>
      </div>
    </div>
  </div>
</template>
