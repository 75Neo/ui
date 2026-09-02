<script setup lang="ts">
import { ref } from "vue";
import { CalendarDays } from "@lucide/vue";
import { dateInput, variantValues } from "@75neo/themes";
import { DateInput, parseDate } from "@75neo/vue";

const sizes = variantValues(dateInput, "size");
const colors = variantValues(dateInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const date = ref(parseDate(["2026-03-14"]));
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <DateInput :size="size" :default-value="parseDate(['2026-03-14'])" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the ring around the field and the tint on the segment holding
      the caret, so tab in and arrow between the parts to see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <DateInput :color="accent" size="sm" :default-value="parseDate(['2026-03-14'])" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-start gap-8">
      <DateInput label="With an icon" :leading-icon="CalendarDays" />
      <DateInput label="To the minute" granularity="minute" />
      <DateInput label="Read in German" locale="de-DE" :default-value="parseDate(['2026-03-14'])" />
      <DateInput
        label="Padded"
        should-force-leading-zeros
        :default-value="parseDate(['2026-03-04'])"
      />
      <DateInput label="Disabled" disabled :default-value="parseDate(['2026-03-14'])" />
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-start gap-8">
      <DateInput
        label="A stay"
        selection-mode="range"
        :default-value="parseDate(['2026-03-14', '2026-03-21'])"
      />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is an array of DateValue whatever the selection mode. -->
    <div class="flex flex-wrap items-center gap-8">
      <DateInput v-model="date" label="Controlled" />
      <output class="font-mono text-sm text-toned">
        {{ date.map((entry) => entry.toString()).join(" ") }}
      </output>
    </div>
  </div>
</template>
