<script setup lang="ts">
import { JsonTreeView, JsonTreeViewTree } from "@/components/vue";

const item = {
  name: "button",
  type: "registry:ui",
  title: "Button",
  registryDependencies: ["@75neo/theme"],
  dependencies: ["@ark-ui/vue", "cn", "tailwind-variants"],
  files: [{ path: "registry/vue/ui/button/Button.vue", type: "registry:ui" }],
  deprecated: false,
};
</script>

<template>
  <JsonTreeView :data="item" :default-expanded-depth="2">
    <JsonTreeViewTree />
  </JsonTreeView>
</template>
