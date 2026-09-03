<script setup lang="ts">
import { ref } from "vue";
import { Check, Moon, Sun, X } from "@lucide/vue";
import { switch as switchRecipe, variantValues } from "@75neo/themes";
import { Switch } from "@75neo/vue";

const sizes = variantValues(switchRecipe, "size");
const colors = variantValues(switchRecipe, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const dark = ref(false);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Switch :size="size" :label="`Ship it (${size})`" default-checked />
    </div>

    <hr class="border-muted" />

    <div v-for="color in colors" :key="color" :class="row">
      <p :class="rowLabel" data-identifier>{{ color }}</p>
      <div class="flex flex-wrap items-center gap-6">
        <Switch :color="color" label="On" default-checked />
        <Switch :color="color" label="Off" />
        <Switch :color="color" label="Loading" loading default-checked />
      </div>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-col gap-4">
      <Switch
        label="Weekly digest"
        description="One email on Monday with everything that changed. Unsubscribe any time."
        default-checked
      />
      <Switch label="Disabled and on" default-checked disabled />
      <Switch label="Invalid" color="error" invalid />
      <!-- Both icons ride the thumb; the recipe shows whichever the state calls for. -->
      <Switch label="With icons" :checked-icon="Check" :unchecked-icon="X" default-checked />
    </div>

    <hr class="border-muted" />

    <!-- Controlled, so the label can answer for the state rather than repeat it. -->
    <div class="flex items-center gap-3">
      <Switch
        v-model:checked="dark"
        color="secondary"
        :label="dark ? 'Dark' : 'Light'"
        :checked-icon="Moon"
        :unchecked-icon="Sun"
      />
    </div>
  </div>
</template>
