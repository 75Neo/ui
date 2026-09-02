<script setup lang="ts">
import { ref } from "vue";
import { datePicker, variantValues } from "@75neo/themes";
import { DatePicker, parseDate } from "@75neo/vue";

const sizes = variantValues(datePicker, "size");
const colors = variantValues(datePicker, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const date = ref(parseDate(["2026-03-14"]));
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <DatePicker :size="size" :default-value="parseDate(['2026-03-14'])" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the field's focus ring, today's date, the selected day and the
      tint across a range, so open one to see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <DatePicker :color="accent" size="sm" :default-value="parseDate(['2026-03-14'])" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <DatePicker label="Opens on click" open-on-click />
      <DatePicker label="Six weeks, always" fixed-weeks />
      <DatePicker label="Read in German" locale="de-DE" />
      <DatePicker label="Disabled" disabled :default-value="parseDate(['2026-03-14'])" />
      <DatePicker
        label="Several days"
        selection-mode="multiple"
        :default-value="parseDate(['2026-03-14', '2026-03-18'])"
      />
      <DatePicker
        label="A stay"
        selection-mode="range"
        :default-value="parseDate(['2026-03-14', '2026-03-21'])"
      />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is an array of DateValue whatever the selection mode. -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <DatePicker v-model="date" label="Controlled" />
      <output class="font-mono text-sm text-toned">
        {{ date.map((entry) => entry.toString()).join(" ") }}
      </output>
    </div>
  </div>
</template>
