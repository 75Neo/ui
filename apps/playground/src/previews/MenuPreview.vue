<script setup lang="ts">
import { computed, ref } from "vue";
import { Copy, FileText, Scissors, Settings, Trash2 } from "@lucide/vue";
import { menu, type MenuItem, variantValues } from "@75neo/themes";
import { Button, Menu } from "@75neo/vue";
import type { Component } from "vue";

const sizes = variantValues(menu, "size");
const colors = variantValues(menu, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const basic: MenuItem<Component>[] = [
  { label: "New file", icon: FileText, shortcut: "⌘N" },
  { label: "Copy", icon: Copy, shortcut: "⌘C" },
  { label: "Cut", icon: Scissors, shortcut: "⌘X", disabled: true },
  { type: "separator" },
  { label: "Delete", icon: Trash2, shortcut: "⌫" },
];

const grouped: MenuItem<Component>[] = [
  { type: "label", label: "File" },
  { label: "New file", icon: FileText },
  { label: "Open recent", children: [{ label: "index.ts" }, { label: "menu.ts" }] },
  { type: "label", label: "Danger" },
  { label: "Delete", icon: Trash2 },
];

const nested: MenuItem<Component>[] = [
  { label: "Share" },
  {
    label: "Export as",
    children: [
      { label: "PDF" },
      { label: "PNG" },
      { label: "More", children: [{ label: "SVG" }, { label: "WebP" }] },
    ],
  },
];

const wrap = ref(true);
const minimap = ref(false);
const chosen = ref("nothing yet");

const views = computed<MenuItem<Component>[]>(() => [
  { type: "label", label: "View" },
  {
    type: "checkbox",
    label: "Word wrap",
    checked: wrap.value,
    onCheckedChange: (next) => (wrap.value = next),
  },
  {
    type: "checkbox",
    label: "Minimap",
    checked: minimap.value,
    onCheckedChange: (next) => (minimap.value = next),
  },
  { type: "separator" },
  { label: "Settings", icon: Settings, href: "#settings" },
]);
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <Menu :size="size" :items="basic">
        <Button size="sm" variant="outline">Actions</Button>
      </Menu>
    </div>

    <hr class="border-muted" />

    <!--
      The accent reaches the highlighted row and a checked one, so open a menu and arrow
      down to see it.
    -->
    <div v-for="accent in colors" :key="accent" :class="row">
      <p :class="rowLabel" data-identifier>{{ accent }}</p>
      <Menu :color="accent" size="sm" :items="basic">
        <Button size="sm" variant="outline" :color="accent">Actions</Button>
      </Menu>
    </div>

    <hr class="border-muted" />

    <div class="flex flex-wrap items-start gap-3">
      <Menu :items="grouped">
        <Button variant="outline">Headings</Button>
      </Menu>
      <Menu :items="views">
        <Button variant="outline">Ticks and a link</Button>
      </Menu>
      <Menu :items="nested">
        <Button variant="outline">Three deep</Button>
      </Menu>
      <Menu :items="basic" arrow placement="right-start">
        <Button variant="outline">With an arrow</Button>
      </Menu>
      <Menu :items="basic" :transition="false">
        <Button variant="outline">No motion</Button>
      </Menu>
    </div>

    <hr class="border-muted" />

    <!-- Every row carries a value, which is what Ark reports when one is chosen. -->
    <div class="flex flex-wrap items-center gap-4">
      <Menu :items="basic" @select="chosen = $event.value">
        <Button variant="outline">Tell me what was chosen</Button>
      </Menu>
      <output class="font-mono text-sm text-toned">{{ chosen }}</output>
    </div>
  </div>
</template>
