<script setup lang="ts">
import { Tour, useTour } from "@75neo/vue/tour";

const tourSteps = [
  {
    id: "welcome",
    type: "dialog" as const,
    title: "Welcome!",
    description: "A quick walk over the page.",
    actions: [{ label: "Start", action: "next" as const }],
  },
  {
    id: "upload",
    type: "tooltip" as const,
    title: "Upload",
    description: "Your files land here.",
    target: () => document.querySelector<HTMLElement>("#tour-target-upload-vue"),
    actions: [
      { label: "Back", action: "prev" as const },
      { label: "Next", action: "next" as const },
    ],
  },
  {
    id: "done",
    type: "dialog" as const,
    title: "All set!",
    description: "That was the whole tour.",
    actions: [{ label: "Finish", action: "dismiss" as const }],
  },
];

const tour = useTour({ steps: tourSteps });

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>start</p>
        <div :class="rowItems">
          <button type="button" @click="tour.start()">Start tour</button>
          <button id="tour-target-upload-vue" type="button">Upload</button>
        </div>
      </div>
    </div>

    <Tour :tour="tour" />
  </div>
</template>
