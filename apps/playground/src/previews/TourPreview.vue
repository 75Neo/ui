<script setup lang="ts">
import { tour, variantValues } from "@75neo/themes";
import { Button, Tour, useTour, type TourStepDetails } from "@75neo/vue";
import { Sparkles } from "@lucide/vue";

const sizes = variantValues(tour, "size");

const steps: TourStepDetails[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome to the tour",
    description: "Two buttons below want showing off. This first stop is a dialog, not a tooltip.",
    actions: [{ label: "Show me", action: "next" }],
  },
  {
    id: "upload",
    type: "tooltip",
    title: "Upload files",
    description: "Click here to upload files to the cloud, or so the tooltip claims.",
    target: () => document.querySelector<HTMLElement>("#tour-upload-vue"),
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "save",
    type: "tooltip",
    title: "Save changes",
    description:
      "Save the work to keep the progress. The spotlight is the ring around this button.",
    target: () => document.querySelector<HTMLElement>("#tour-save-vue"),
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
];

const trip = useTour({ steps });

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
const targetButton =
  "cursor-pointer rounded-md px-3 py-1.5 text-sm ring ring-accented ring-inset hover:bg-elevated";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div class="flex flex-wrap items-center gap-2">
      <Button size="sm" :leading-icon="Sparkles" @click="trip.start()">Start tour</Button>
      <p class="text-sm text-muted">
        {{
          trip.open ? `On step ${trip.stepIndex + 1} of ${trip.totalSteps}` : "The tour is idle."
        }}
      </p>
    </div>

    <div class="flex flex-wrap gap-2">
      <button id="tour-upload-vue" type="button" :class="targetButton">Upload</button>
      <button id="tour-save-vue" type="button" :class="targetButton">Save</button>
    </div>

    <Tour :tour="trip" />

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>sizes</p>
      <p class="text-sm text-muted">
        The panel comes in {{ sizes.join(", ") }} — start the tour above and restyle it per call
        site with the <code>size</code> prop.
      </p>
    </div>
  </div>
</template>
