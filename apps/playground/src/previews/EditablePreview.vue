<script setup lang="ts">
import { ref } from "vue";
import { editable, variantValues } from "@75neo/themes";
import { Editable } from "@75neo/vue";

const sizes = variantValues(editable, "size");
const colors = variantValues(editable, "color");

const text = ref("The controlled sentence");
const editing = ref(false);

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Editable :size="size" label="Project name" default-value="rings-of-power" />
    </div>

    <hr class="border-muted" />

    <!-- The accent reaches the field's focus ring, so tab in to see it. -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <Editable :color="accent" size="sm" default-value="Tab into this field" />
    </div>

    <hr class="border-muted" />

    <div class="grid gap-6 @lg:grid-cols-2">
      <Editable
        label="Double-click to edit"
        activation-mode="dblclick"
        default-value="A single click only selects me"
      />
      <Editable
        label="Enter commits, blur reverts"
        submit-mode="enter"
        default-value="Click away and I go back"
      />
      <Editable label="Read-only" read-only default-value="You cannot change this" />
      <Editable label="Disabled" disabled default-value="Nor this" />
    </div>

    <hr class="border-muted" />

    <!-- Controlled: the text and the edit state both report back. -->
    <div class="flex flex-col gap-2">
      <Editable v-model="text" v-model:edit="editing" label="Controlled" />
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
        <output class="font-mono text-sm text-toned">“{{ text }}”</output>
        <button
          type="button"
          class="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          @click="editing = !editing"
        >
          {{ editing ? "Stop editing" : "Start editing" }}
        </button>
      </div>
    </div>
  </div>
</template>
