<script setup lang="ts">
import { ref } from "vue";
import { slider, variantValues } from "@75neo/themes";
import { Slider } from "@75neo/vue";

const sizes = variantValues(slider, "size");
const colors = variantValues(slider, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const marks = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
];

const budget = ref([20, 70]);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Slider :size="size" :default-value="[40]" />
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <Slider :color="color" :default-value="[40]" />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>labelled</p>
      <Slider label="Volume" show-value :default-value="[65]" />
    </div>

    <!--
      Two values, one component: Ark renders a thumb per entry and the range between the
      outermost two, so nothing about the styling counts them.
    -->
    <div :class="row">
      <p :class="rowLabel" data-identifier>range</p>
      <Slider
        v-model="budget"
        :label="`Budget ${budget[0]} to ${budget[1]}`"
        color="success"
        :min-steps-between-thumbs="5"
      />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>marks</p>
      <Slider label="Quality" :marks="marks" :step="25" :default-value="[50]" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>centred</p>
      <Slider label="Balance" origin="center" :min="-50" :max="50" :default-value="[-20]" />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>disabled</p>
      <Slider label="Locked" :default-value="[30]" disabled />
    </div>

    <hr class="border-muted" />

    <div :class="row">
      <p :class="rowLabel" data-identifier>vertical</p>
      <div class="flex h-44 items-stretch gap-6">
        <Slider orientation="vertical" :default-value="[40]" />
        <Slider orientation="vertical" color="warning" :default-value="[70]" />
        <Slider orientation="vertical" color="error" :default-value="[20, 80]" />
      </div>
    </div>
  </div>
</template>
