<script setup lang="ts">
import { TreeView } from "@75neo/vue/tree-view";
import { treeViewSchema } from "@75neo/themes";

const sizes = treeViewSchema.size.values;
const colors = treeViewSchema.color.values;

const items = [
  {
    value: "src",
    label: "src",
    children: [
      { value: "src-button", label: "button.tsx" },
      { value: "src-index", label: "index.ts" },
    ],
  },
  { value: "readme", label: "README.md" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";
</script>

<template>
  <div class="@container">
    <div :class="group">
      <div v-for="size in sizes" :key="size" :class="row">
        <p :class="rowLabel" data-identifier>{{ size }}</p>
        <div :class="rowItems">
          <TreeView :size="size" :items="items" label="Files" :default-expanded-value="['src']" />
        </div>
      </div>
    </div>

    <hr :class="rule" />

    <div :class="group">
      <div :class="row">
        <p :class="rowLabel" data-identifier>colors</p>
        <div :class="[rowItems, 'flex flex-col gap-2']">
          <TreeView
            v-for="color in colors"
            :key="color"
            :color="color"
            :items="items"
            :default-expanded-value="['src']"
            :default-selected-value="['src-button']"
          />
        </div>
      </div>

      <div :class="row">
        <p :class="rowLabel" data-identifier>multiple</p>
        <div :class="rowItems">
          <TreeView
            :items="items"
            selection-mode="multiple"
            :default-expanded-value="['src']"
            :default-selected-value="['src-button', 'readme']"
          />
        </div>
      </div>
    </div>
  </div>
</template>
