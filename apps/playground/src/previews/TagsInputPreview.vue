<script setup lang="ts">
import { ref } from "vue";
import { tagsInput, variantValues } from "@75neo/themes";
import { TagsInput } from "@75neo/vue";

const sizes = variantValues(tagsInput, "size");
const colors = variantValues(tagsInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const starting = ["design", "typography"];

const tags = ref(["rust", "wasm"]);

function lowercaseOnly(details: { inputValue: string }) {
  return details.inputValue === details.inputValue.toLowerCase();
}
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <TagsInput :size="size" :default-value="starting" placeholder="Add a tag" />
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the focus ring and a tag under the arrow keys, so click in and
      press the left arrow to see the second one.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <TagsInput :color="accent" size="sm" :default-value="starting" placeholder="Add a tag" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <TagsInput label="Three at most" :max="3" :default-value="starting" />
      <TagsInput
        label="Past the limit is invalid"
        :max="2"
        allow-overflow
        :default-value="['one', 'two', 'three']"
      />
      <TagsInput label="Duplicates welcome" allow-duplicates :default-value="['same', 'same']" />
      <TagsInput label="Paste splits on the comma" add-on-paste placeholder="Paste a,b,c" />
      <TagsInput label="Fixed once made" :editable="false" :default-value="starting" />
      <TagsInput
        label="Only lowercase"
        :validate="lowercaseOnly"
        placeholder="Try an Uppercase one"
      />
      <TagsInput label="Read only" read-only :default-value="starting" />
      <TagsInput label="Disabled" disabled :default-value="starting" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled. Double-click a tag to rewrite it in place. -->
    <div class="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
      <TagsInput v-model="tags" label="Controlled" />
      <output class="font-mono text-sm text-toned">[{{ tags.join(", ") }}]</output>
    </div>
  </div>
</template>
