<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import type { TreeNode } from "@ark-ui/vue/collection";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewItemProps {
  node: TreeNode;
  indexPath: number[];
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.Item
    :node="props.node"
    :index-path="props.indexPath"
    :class="cn(styles.item(), props.class)"
  >
    <slot />
  </Ark.Item>
</template>
