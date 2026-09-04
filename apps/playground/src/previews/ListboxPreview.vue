<script setup lang="ts">
import { ref } from "vue";
import { listbox, variantValues } from "@75neo/themes";
import { Listbox } from "@75neo/vue";

const sizes = variantValues(listbox, "size");
const colors = variantValues(listbox, "color");

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
  { value: "rb", label: "Ruby" },
  { value: "ex", label: "Elixir" },
  { value: "hs", label: "Haskell", disabled: true },
];

const picked = ref<string[]>(["rs"]);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Listbox :size="size" label="Pick a language" :items="languages" :default-value="['ts']" />
    </div>

    <hr class="border-muted" />

    <!-- The accent reaches the highlight and the chosen row, so arrow through the list. -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <Listbox :color="accent" size="sm" :items="languages" :default-value="['ts']" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <Listbox
        label="Many at once"
        :items="languages"
        selection-mode="multiple"
        :default-value="['ts', 'rs']"
      />
      <Listbox
        label="With keys held"
        :items="languages"
        selection-mode="extended"
        :default-value="['go']"
      />
      <Listbox label="Nothing to offer" :items="[]" empty-message="No languages found." />
      <Listbox label="Disabled" :items="languages" disabled :default-value="['ts']" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is the option's `value`, in an array whatever the mode. -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <Listbox v-model="picked" label="Controlled" :items="languages" />
      <output class="font-mono text-sm text-toned">[{{ picked.join(", ") }}]</output>
    </div>
  </div>
</template>
