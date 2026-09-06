<script setup lang="ts">
import { type Component, computed } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { ChevronRight as ChevronRightIcon } from "@lucide/vue";
import { cn, treeViewSizeData, type TreeViewNode } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";
import TreeViewBranch from "./branch.vue";
import TreeViewBranchContent from "./branch-content.vue";
import TreeViewBranchControl from "./branch-control.vue";
import TreeViewBranchIndicator from "./branch-indicator.vue";
import TreeViewBranchText from "./branch-text.vue";
import TreeViewItem from "./item.vue";
import TreeViewItemText from "./item-text.vue";

/**
 * Maps data nodes to rows, branches recursing. Internal: exported from nothing,
 * like its Menu sibling — a `<script setup>` component is the only thing in Vue
 * that can render itself. Callers compose the exported parts, never this.
 */
const props = defineProps<{
  nodes: TreeViewNode<Component>[];
  indexPath: number[];
  branchIndicatorIcon?: Component;
}>();

const variants = useTreeViewVariants();
const leadingClass = computed(() =>
  cn("shrink-0 text-dimmed [&>svg]:size-full", treeViewSizeData.leadingIcon[variants.size]),
);
</script>

<template>
  <template v-for="(node, position) in props.nodes" :key="node.value">
    <Ark.NodeProvider :node="node" :index-path="[...props.indexPath, position]">
      <TreeViewBranch v-if="node.children != null && node.children.length > 0">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator>
            <component :is="props.branchIndicatorIcon ?? ChevronRightIcon" />
          </TreeViewBranchIndicator>
          <span v-if="node.icon != null" data-slot="tree-view-leading-icon" :class="leadingClass">
            <component :is="node.icon" />
          </span>
          <TreeViewBranchText>{{ node.label }}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewRows
            :nodes="node.children"
            :index-path="[...props.indexPath, position]"
            :branch-indicator-icon="props.branchIndicatorIcon"
          />
        </TreeViewBranchContent>
      </TreeViewBranch>
      <TreeViewItem v-else>
        <span v-if="node.icon != null" data-slot="tree-view-leading-icon" :class="leadingClass">
          <component :is="node.icon" />
        </span>
        <TreeViewItemText>{{ node.label }}</TreeViewItemText>
      </TreeViewItem>
    </Ark.NodeProvider>
  </template>
</template>

<script lang="ts">
// Self-reference for recursion: this module renders itself for sub-branches.
export default { name: "TreeViewRows" };
</script>
