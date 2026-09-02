<script setup lang="ts">
import { ref } from "vue";
import { combobox, variantValues } from "@75neo/themes";
import { Combobox } from "@75neo/vue";

const sizes = variantValues(combobox, "size");
const colors = variantValues(combobox, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
  { value: "rb", label: "Ruby" },
  { value: "ex", label: "Elixir" },
  { value: "hs", label: "Haskell" },
];

const picked = ref(["rs"]);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Combobox :size="size" :items="languages" placeholder="Pick a language" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the focus ring on the field and the highlight on an option, so
      tab in and arrow down to see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <Combobox
        :color="accent"
        size="sm"
        :items="languages"
        :default-value="['ts']"
        placeholder="Pick a language"
      />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <Combobox
        label="Opens on click"
        :items="languages"
        open-on-click
        placeholder="Click to see them all"
      />
      <Combobox
        label="Many at once"
        :items="languages"
        multiple
        placeholder="Pick as many as you like"
      />
      <Combobox
        label="Anything goes"
        :items="languages"
        allow-custom-value
        placeholder="Or type your own"
      />
      <Combobox label="Disabled" :items="languages" disabled placeholder="Not today" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is the item's `value`, in an array whatever the mode. -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <Combobox v-model="picked" label="Controlled" :items="languages" />
      <output class="font-mono text-sm text-toned">[{{ picked.join(", ") }}]</output>
    </div>
  </div>
</template>
