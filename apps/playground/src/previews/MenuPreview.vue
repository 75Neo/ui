<script setup lang="ts">
import { Menu } from "@75neo/vue/menu";
import { menuSchema } from "@75neo/themes";

const sizes = menuSchema.size.values;
const colors = menuSchema.color.values;

const items = [
  { value: "new", label: "New file" },
  { value: "open", label: "Open…" },
  { type: "separator" as const },
  { value: "save", label: "Save", shortcut: "⌘S" },
];

const checkItems = [
  { value: "toolbar", label: "Show toolbar", type: "checkbox" as const, checked: true },
  { value: "status", label: "Show status bar", type: "checkbox" as const },
];

const nestedItems = [
  { value: "email", label: "Email" },
  {
    value: "share",
    label: "Share",
    children: [
      { value: "message", label: "Message" },
      { value: "airdrop", label: "AirDrop" },
    ],
  },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <Menu :size="size" :items="items">
            <button type="button">File</button>
          </Menu>
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="rowItems">
          <Menu v-for="color in colors" :key="color" :color="color" :items="checkItems">
            <button type="button">{{ color }}</button>
          </Menu>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>checkbox</p>
        <div :class="rowItems">
          <Menu :items="checkItems">
            <button type="button">View</button>
          </Menu>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>submenu</p>
        <div :class="rowItems">
          <Menu :items="nestedItems">
            <button type="button">Share</button>
          </Menu>
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>arrow</p>
        <div :class="rowItems">
          <Menu :items="items" arrow>
            <button type="button">File</button>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
