<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import type { TreeNode } from "@ark-ui/vue/collection";

interface TreeViewBranchProps {
  node: TreeNode;
  indexPath: number[];
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Branch :node="props.node" :index-path="props.indexPath" :class="props.class">
    <slot />
  </Ark.Branch>
</template>
