<script setup lang="ts">
import { Select } from "@75neo/vue/select";
import { selectSchema } from "@75neo/themes";

const sizes = selectSchema.size.values;
const colors = selectSchema.color.values;

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Select :size="size" :items="items" label="Framework" placeholder="Select" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <Select
            v-for="color in colors"
            :key="color"
            :color="color"
            :items="items"
            :default-value="['react']"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>multiple</p>
        <div :class="rowItems">
          <Select :items="items" multiple :default-value="['react', 'vue']" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>disabled</p>
        <div :class="rowItems">
          <Select :items="items" disabled placeholder="Select" />
        </div>
      </div>
    </div>
  </div>
</template>
