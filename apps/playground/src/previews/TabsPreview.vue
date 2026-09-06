<script setup lang="ts">
import { Tabs } from "@75neo/vue/tabs";
import { tabsSchema } from "@75neo/themes";

const variants = tabsSchema.variant.values;
const colors = tabsSchema.color.values;
const sizes = tabsSchema.size.values;

const items = [
  { value: "account", label: "Account", content: "Make changes to your account here." },
  { value: "password", label: "Password", content: "Change your password here." },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="variant in variants" :key="variant" :class="row">
        <p :class="rowLabel" data-identifier>{{ variant }}</p>
        <div :class="rowItems">
          <Tabs :variant="variant" :items="items" default-value="account" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <Tabs
            v-for="color in colors"
            :key="color"
            :color="color"
            :items="items"
            default-value="account"
          />
        </div>
      </div>

      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Tabs :size="size" :items="items" default-value="account" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <Tabs :items="items" orientation="vertical" default-value="account" />
        </div>
      </div>
    </div>
  </div>
</template>
