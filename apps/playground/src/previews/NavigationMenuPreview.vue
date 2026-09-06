<script setup lang="ts">
import { NavigationMenu } from "@75neo/vue/navigation-menu";
import { navigationMenuSchema } from "@75neo/themes";

const sizes = navigationMenuSchema.size.values;
const colors = navigationMenuSchema.color.values;

const items = [
  {
    value: "components",
    label: "Components",
    links: [
      { href: "#button", title: "Button", description: "The one every page has" },
      {
        href: "#select",
        title: "Select",
        description: "A list that opens on demand",
        current: true,
      },
      { href: "#dialog", title: "Dialog", description: "A panel over the page" },
    ],
  },
  {
    value: "guides",
    label: "Guides",
    links: [
      { href: "#install", title: "Installation" },
      { href: "#theming", title: "Theming" },
    ],
  },
  { value: "docs", label: "Docs", href: "#docs" },
  { value: "changelog", label: "Changelog", href: "#changelog", disabled: true },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <NavigationMenu :size="size" :items="items" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div v-for="color in colors" :key="color" :class="row">
        <p :class="rowLabel" data-identifier>{{ color }}</p>
        <div :class="rowItems">
          <NavigationMenu :color="color" :items="items" />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>vertical</p>
        <div :class="rowItems">
          <div class="max-w-48">
            <NavigationMenu orientation="vertical" :items="items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
