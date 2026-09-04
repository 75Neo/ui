<script setup lang="ts">
import type { Component } from "vue";
import { Copy, FileText, Trash2 } from "@lucide/vue";
import type { MenuItem } from "@75neo/themes";
import { Button, Menu } from "@75neo/vue";

const items: MenuItem<Component>[] = [
  { type: "label", label: "File" },
  { label: "New file", icon: FileText, shortcut: "⌘N" },
  { label: "Duplicate", icon: Copy, shortcut: "⌘D" },
  { label: "Export as", children: [{ label: "PDF" }, { label: "PNG" }] },
  { type: "separator" },
  { label: "Delete", icon: Trash2, shortcut: "⌫" },
];
</script>

<template>
  <Menu :items="items">
    <Button variant="outline">Actions</Button>
  </Menu>
</template>
