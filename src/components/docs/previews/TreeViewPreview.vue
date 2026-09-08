<script setup lang="ts">
import { ChevronRight, File, Folder } from "@lucide/vue";
import { createTreeCollection } from "@ark-ui/vue/collection";
import { TreeViewNodeProvider } from "@ark-ui/vue/tree-view";
import TreeView from "@/registry/vue/ui/tree-view/TreeView.vue";
import TreeViewBranch from "@/registry/vue/ui/tree-view/TreeViewBranch.vue";
import TreeViewBranchContent from "@/registry/vue/ui/tree-view/TreeViewBranchContent.vue";
import TreeViewBranchControl from "@/registry/vue/ui/tree-view/TreeViewBranchControl.vue";
import TreeViewBranchIndicator from "@/registry/vue/ui/tree-view/TreeViewBranchIndicator.vue";
import TreeViewBranchText from "@/registry/vue/ui/tree-view/TreeViewBranchText.vue";
import TreeViewItem from "@/registry/vue/ui/tree-view/TreeViewItem.vue";
import TreeViewItemText from "@/registry/vue/ui/tree-view/TreeViewItemText.vue";
import TreeViewLabel from "@/registry/vue/ui/tree-view/TreeViewLabel.vue";
import TreeViewTree from "@/registry/vue/ui/tree-view/TreeViewTree.vue";

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "root",
    name: "registry",
    children: [
      {
        id: "shared",
        name: "shared",
        children: [{ id: "button-styles", name: "button.styles.ts" }],
      },
      {
        id: "vue",
        name: "vue",
        children: [{ id: "button-vue", name: "Button.vue" }],
      },
      { id: "theme", name: "theme.css" },
    ],
  },
});
</script>

<template>
  <TreeView :collection="collection" :default-expanded-value="['shared']" class="max-w-72">
    <TreeViewLabel>Registry sources</TreeViewLabel>
    <TreeViewTree>
      <TreeViewNodeProvider
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :index-path="[index]"
      >
        <TreeViewBranch v-if="node.children" :node="node" :index-path="[index]">
          <TreeViewBranchControl>
            <TreeViewBranchIndicator>
              <ChevronRight />
            </TreeViewBranchIndicator>
            <Folder class="size-4 shrink-0 text-dimmed" />
            <TreeViewBranchText>{{ node.name }}</TreeViewBranchText>
          </TreeViewBranchControl>
          <TreeViewBranchContent>
            <TreeViewItem
              v-for="(child, childIndex) in node.children"
              :key="child.id"
              :node="child"
              :index-path="[index, childIndex]"
            >
              <File class="size-4 shrink-0 text-dimmed" />
              <TreeViewItemText>{{ child.name }}</TreeViewItemText>
            </TreeViewItem>
          </TreeViewBranchContent>
        </TreeViewBranch>

        <TreeViewItem v-else :node="node" :index-path="[index]">
          <File class="size-4 shrink-0 text-dimmed" />
          <TreeViewItemText>{{ node.name }}</TreeViewItemText>
        </TreeViewItem>
      </TreeViewNodeProvider>
    </TreeViewTree>
  </TreeView>
</template>
