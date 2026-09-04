<script setup lang="ts">
import { ref } from "vue";
import { steps, variantValues, type StepsItem } from "@75neo/themes";
import { Steps } from "@75neo/vue";

const sizes = variantValues(steps, "size");
const step = ref(0);

const items: StepsItem[] = [
  {
    title: "Contact info",
    description: "Where do we reach you?",
    content: "Name, email and a phone number. Nothing here is shared until the last step.",
  },
  {
    title: "Date and time",
    description: "When should it happen?",
    content: "Pick a day and a slot. Weekends cost extra and read about right on the invoice.",
  },
  {
    title: "Select rooms",
    description: "How much space?",
    content: "One room per guest, and the attic is not a room no matter what the listing says.",
  },
];

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Steps
        :size="size"
        :items="items"
        completed-content="Steps complete — thank you for filling out the form."
      />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <Steps orientation="vertical" :items="items" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>linear</p>
      <Steps linear :items="items" :default-step="1" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-col gap-2">
      <p class="text-sm text-muted">
        Controlled: on step {{ step + 1 }} of {{ items.length }} — the buttons below jump without
        the panel's own.
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(item, index) in items"
          :key="item.title"
          type="button"
          class="cursor-pointer rounded-md px-2 py-1 text-sm ring ring-accented ring-inset hover:bg-elevated"
          @click="step = index"
        >
          {{ item.title }}
        </button>
      </div>
      <Steps v-model:step="step" :items="items" />
    </div>
  </div>
</template>
