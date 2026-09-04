<script setup lang="ts">
import { computed, type Component } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { createTreeCollection } from "@ark-ui/vue/collection";
import { ChevronRight } from "@lucide/vue";
import { treeView, type TreeViewItem, type TreeViewProps } from "@75neo/themes";
import { useResolvedTheme } from "../composables/theme";
import TreeViewRows from "./TreeViewRows.vue";

/**
 * Selection and expansion live outside the shared contract, because React and Vue
 * spell a controlled value too differently to share one type. Here they are
 * `v-model:selectedValue` and `v-model:expandedValue`, with the `default*`
 * counterparts Ark's root already takes.
 */
const props = defineProps<
  TreeViewProps<Component> & {
    class?: unknown;
    defaultExpandedValue?: string[];
    defaultSelectedValue?: string[];
    ids?: { root?: string; tree?: string; label?: string; node?: (value: string) => string };
  }
>();

const emit = defineEmits<{
  /** Fired whenever branches open or close. */
  expandedChange: [details: { expandedValue: string[] }];
  /** Fired whenever the selection changes. */
  selectionChange: [details: { selectedValue: string[] }];
}>();

const expandedValue = defineModel<string[] | undefined>("expandedValue", {
  default: undefined,
});
const selectedValue = defineModel<string[] | undefined>("selectedValue", {
  default: undefined,
});

/*
 * Ark's tree runs on a collection, and the collection is derived state: rebuilt only
 * when the items change, so expansion and selection survive re-renders.
 */
const collection = computed(() =>
  createTreeCollection<TreeViewItem<Component>>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: { value: "__root__", label: "", children: props.items },
  }),
);

const theme = useResolvedTheme(
  treeView,
  "treeView",
  () => props,
  () => props.class as string | undefined,
);
</script>

<template>
  <Ark.Root
    v-model:expanded-value="expandedValue"
    v-model:selected-value="selectedValue"
    data-slot="base"
    :class="theme.class.base"
    :collection="collection"
    :selection-mode="props.selectionMode"
    :lazy-mount="props.lazyMount"
    :unmount-on-exit="props.unmountOnExit"
    :default-expanded-value="props.defaultExpandedValue"
    :default-selected-value="props.defaultSelectedValue"
    :ids="props.ids"
    @expanded-change="emit('expandedChange', $event)"
    @selection-change="emit('selectionChange', $event)"
  >
    <Ark.Label v-if="props.label != null" data-slot="label" :class="theme.class.label">
      {{ props.label }}
    </Ark.Label>
    <Ark.Tree data-slot="tree" :class="theme.class.tree">
      <TreeViewRows
        :nodes="collection.rootNode.children ?? []"
        :index-path="[]"
        :theme="theme"
        :branch-indicator-icon="props.branchIndicatorIcon ?? ChevronRight"
      />
    </Ark.Tree>
  </Ark.Root>
</template>
