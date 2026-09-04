<script setup lang="ts">
import type { Component } from "vue";
import { treeView, variantValues, type TreeViewItem } from "@75neo/themes";
import { TreeView } from "@75neo/vue";
import { FileText, Folder, FolderOpen } from "@lucide/vue";

const sizes = variantValues(treeView, "size");

const items: TreeViewItem<Component>[] = [
  {
    value: "src",
    label: "src",
    icon: Folder,
    children: [
      { value: "src/app.tsx", label: "app.tsx", icon: FileText },
      { value: "src/index.ts", label: "index.ts", icon: FileText },
      {
        value: "src/components",
        label: "components",
        icon: FolderOpen,
        children: [
          { value: "src/components/button.vue", label: "button.vue", icon: FileText },
          { value: "src/components/tour.vue", label: "tour.vue", icon: FileText },
        ],
      },
    ],
  },
  { value: "package.json", label: "package.json", icon: FileText },
  { value: "readme.md", label: "readme.md", icon: FileText },
];

const row = "grid gap-2 @sm:grid-cols-[6rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";
</script>

<template>
  <div class="@container flex flex-col gap-6">
    <div :class="row">
      <p :class="rowLabel" data-identifier>single</p>
      <TreeView
        label="Project files"
        :items="items"
        :default-expanded-value="['src']"
        :default-selected-value="['src/index.ts']"
      />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>multiple</p>
      <TreeView
        label="Project files"
        :items="items"
        selection-mode="multiple"
        :default-expanded-value="['src', 'src/components']"
        :default-selected-value="['src/app.tsx', 'package.json']"
      />
    </div>

    <hr class="border-muted" />

    <div v-for="size in sizes" :key="size" :class="row">
      <p :class="rowLabel" data-identifier>{{ size }}</p>
      <TreeView
        :items="items"
        :size="size"
        :default-expanded-value="['src']"
        :aria-label="`${size} files`"
      />
    </div>

    <div :class="row">
      <p :class="rowLabel" data-identifier>no guide</p>
      <TreeView :items="items" :indent-guide="false" :default-expanded-value="['src']" />
    </div>
  </div>
</template>
