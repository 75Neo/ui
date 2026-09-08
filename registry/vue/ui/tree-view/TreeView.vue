<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import type { TreeCollection, TreeNode } from "@ark-ui/vue/collection";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewProps {
  collection: TreeCollection<TreeNode>;
  defaultExpandedValue?: string[];
  defaultSelectedValue?: string[];
  selectionMode?: "single" | "multiple";
  expandOnClick?: boolean;
  typeahead?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TreeViewProps>(), {
  expandOnClick: undefined,
  typeahead: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    :collection="props.collection"
    :default-expanded-value="props.defaultExpandedValue"
    :default-selected-value="props.defaultSelectedValue"
    :selection-mode="props.selectionMode"
    :expand-on-click="props.expandOnClick"
    :typeahead="props.typeahead"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
