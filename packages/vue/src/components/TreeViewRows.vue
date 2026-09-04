<script setup lang="ts">
import type { Component } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import type { ResolvedTheme } from "@75neo/core";
import { treeView, type TreeViewItem } from "@75neo/themes";

/**
 * The rows of one tree level, and the levels their branches open.
 *
 * @remarks
 * This is the library's second component that is not a component: nothing exports it
 * and no caller reaches it. It exists because a branch holds rows of its own to any
 * depth, and a `<script setup>` file is the only thing in Vue that can render
 * itself — which is what the recursion needs. React has no such constraint, so its
 * half of this lives as a local function inside `TreeView.tsx` and there is no
 * matching file there. The Menu's rows are the precedent.
 *
 * Whether a node is a branch is read off the items array itself, so no Ark node
 * context is needed: a node with children renders a branch, anything else a leaf.
 */
const props = defineProps<{
  nodes: TreeViewItem<Component>[];
  /** The path from the tree root to `nodes`, for Ark's index paths. */
  indexPath: number[];
  theme: ResolvedTheme<typeof treeView>;
  /** Drawn on every branch beside its label, turning as the branch opens. */
  branchIndicatorIcon: Component;
}>();
</script>

<template>
  <template v-for="(node, position) in props.nodes" :key="node.value">
    <Ark.NodeProvider :node="node" :index-path="[...props.indexPath, position]">
      <Ark.Branch
        v-if="node.children != null && node.children.length > 0"
        data-slot="branch"
        :class="props.theme.class.branch"
      >
        <Ark.BranchControl data-slot="branchControl" :class="props.theme.class.branchControl">
          <Ark.BranchIndicator
            data-slot="branchIndicator"
            :class="props.theme.class.branchIndicator"
          >
            <component :is="props.branchIndicatorIcon" />
          </Ark.BranchIndicator>
          <span v-if="node.icon" data-slot="leadingIcon" :class="props.theme.class.leadingIcon">
            <component :is="node.icon" />
          </span>
          <Ark.BranchText data-slot="branchText" :class="props.theme.class.branchText">
            {{ node.label }}
          </Ark.BranchText>
        </Ark.BranchControl>
        <Ark.BranchContent data-slot="branchContent" :class="props.theme.class.branchContent">
          <TreeViewRows
            :nodes="node.children"
            :index-path="[...props.indexPath, position]"
            :theme="props.theme"
            :branch-indicator-icon="props.branchIndicatorIcon"
          />
        </Ark.BranchContent>
      </Ark.Branch>

      <Ark.Item v-else data-slot="item" :class="props.theme.class.item">
        <span v-if="node.icon" data-slot="leadingIcon" :class="props.theme.class.leadingIcon">
          <component :is="node.icon" />
        </span>
        <Ark.ItemText data-slot="itemText" :class="props.theme.class.itemText">
          {{ node.label }}
        </Ark.ItemText>
      </Ark.Item>
    </Ark.NodeProvider>
  </template>
</template>
