<script setup lang="ts">
import { ref } from "vue";
import { numberInput, variantValues } from "@75neo/themes";
import { NumberInput } from "@75neo/vue";

const sizes = variantValues(numberInput, "size");
const colors = variantValues(numberInput, "color");
const orientations = variantValues(numberInput, "orientation");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const typed = ref("3");
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <NumberInput :size="size" default-value="4" />
    </div>

    <hr class="border-muted" />

    <!--
      Both arrangements, from one set of three elements: the row moves them with
      `order`, the column places them by grid line.
    -->
    <div v-for="orientation in orientations" :key="orientation" :class="row">
      <p :class="rowLabel" data-identifier>{{ orientation }}</p>
      <NumberInput :orientation="orientation" default-value="4" />
    </div>

    <hr class="border-muted" />

    <!-- The accent reaches the focus ring and nothing else, so tab in to see it. -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <NumberInput :color="accent" size="sm" default-value="4" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <NumberInput label="One to ten" :min="1" :max="10" default-value="5" />
      <NumberInput label="Two at a time" :step="2" default-value="0" />
      <NumberInput
        label="A price"
        orientation="vertical"
        :format-options="{ style: 'currency', currency: 'USD' }"
        default-value="19.99"
      />
      <NumberInput
        label="A share"
        orientation="vertical"
        :format-options="{ style: 'percent' }"
        :step="0.05"
        default-value="25%"
      />
      <NumberInput label="Wheel works here" allow-mouse-wheel default-value="0" />
      <NumberInput label="Disabled" disabled default-value="4" />
    </div>

    <hr class="border-muted" />

    <!--
      Controlled: the value is the field's text, not a number, so a half-typed minus
      sign or trailing point survives a render.
    -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <NumberInput v-model="typed" label="Controlled" />
      <output class="font-mono text-sm text-toned">{{ JSON.stringify(typed) }}</output>
    </div>
  </div>
</template>
