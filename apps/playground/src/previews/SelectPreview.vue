<script setup lang="ts">
import { ref } from "vue";
import { select, variantValues } from "@75neo/themes";
import { Select } from "@75neo/vue";

const sizes = variantValues(select, "size");
const colors = variantValues(select, "color");

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
  { value: "hs", label: "Haskell", disabled: true },
];

const picked = ref(["rs"]);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Select :size="size" :items="languages" placeholder="Pick a language" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the focus ring on the trigger and the highlight on an option,
      so tab in and arrow down to see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <Select
        :color="accent"
        size="sm"
        :items="languages"
        :default-value="['ts']"
        placeholder="Pick a language"
      />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <Select label="Many at once" :items="languages" multiple placeholder="As many as you like" />
      <Select
        label="Unchoosable"
        :items="languages"
        deselectable
        :default-value="['go']"
        placeholder="Click the answer again"
      />
      <Select label="Still chevron" :items="languages" :spin="false" placeholder="Never turns" />
      <Select label="Disabled" :items="languages" disabled placeholder="Not today" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the value is the item's `value`, in an array whatever the mode. -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <Select v-model="picked" label="Controlled" :items="languages" />
      <output class="font-mono text-sm text-toned">[{{ picked.join(", ") }}]</output>
    </div>
  </div>
</template>
