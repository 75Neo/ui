<script setup lang="ts">
import { Listbox } from "@75neo/vue/listbox";
import { listboxSchema } from "@75neo/themes";

const sizes = listboxSchema.size.values;
const colors = listboxSchema.color.values;

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
          <Listbox :size="size" :items="items" label="Framework" :default-value="['react']" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <Listbox
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
          <Listbox :items="items" selection-mode="multiple" :default-value="['react', 'vue']" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>empty</p>
        <div :class="rowItems">
          <Listbox :items="[]" />
        </div>
      </div>
    </div>
  </div>
</template>
