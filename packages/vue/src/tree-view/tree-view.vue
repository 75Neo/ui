<script setup lang="ts">
import { computed } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { createTreeCollection } from "@ark-ui/vue/collection";
import { cn, treeViewDefaults, type TreeViewNode, type TreeViewRootProps } from "@75neo/themes";
import { provide, reactive } from "vue";
import { treeViewVariantsKey } from "./variants";
import TreeViewLabel from "./label.vue";
import TreeViewTree from "./tree.vue";
import TreeViewRows from "./TreeViewRows.vue";
import type { Component } from "vue";

/** The node shape this adapter builds its collection from. */
type Node = TreeViewNode<Component>;

const props = defineProps<
  TreeViewRootProps<Component> & {
    class?: unknown;
  }
>();

const emit = defineEmits<{
  /** Fired whenever branches open or close. */
  expandedChange: [details: { expandedValue: string[] }];
  /** Fired whenever the selection changes. */
  selectionChange: [details: { selectedValue: string[] }];
}>();

defineSlots<{
  default?: () => unknown;
}>();

/*
 * `default: undefined` keeps absent `v-model`s absent. Without it a declared prop
 * would reach Ark as a value and pin the tree, leaving the `default*` props idle.
 */
const expandedValue = defineModel<string[] | undefined>("expandedValue", {
  default: undefined,
});
const selectedValue = defineModel<string[] | undefined>("selectedValue", {
  default: undefined,
});

// Getters, so a later prop change reaches already-mounted parts.
const resolved = reactive({
  get color() {
    return props.color ?? treeViewDefaults.color;
  },
  get size() {
    return props.size ?? treeViewDefaults.size;
  },
});
provide(treeViewVariantsKey, resolved);

/*
 * Ark's tree runs on a collection, and the collection is derived state: rebuilt only
 * when the items change, so expansion and selection survive re-renders.
 */
const collection = computed(() =>
  createTreeCollection<Node>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: { value: "__root__", label: "", children: props.items },
  }),
);

const rootClass = computed(() =>
  cn("flex min-w-0 flex-col gap-1", props.class as string | undefined),
);
</script>

<template>
  <Ark.Root
    data-slot="tree-view"
    :class="rootClass"
    :collection="collection"
    :data-color="resolved.color"
    :data-size="resolved.size"
    :selection-mode="props.selectionMode"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    v-model:expanded-value="expandedValue"
    v-model:selected-value="selectedValue"
    @expanded-change="emit('expandedChange', $event)"
    @selection-change="emit('selectionChange', $event)"
  >
    <TreeViewLabel v-if="props.label != null">{{ props.label }}</TreeViewLabel>
    <TreeViewTree>
      <TreeViewRows
        :nodes="collection.rootNode.children ?? []"
        :index-path="[]"
        :branch-indicator-icon="props.branchIndicatorIcon"
      />
    </TreeViewTree>
  </Ark.Root>
</template>
