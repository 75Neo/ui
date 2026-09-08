<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewBranchIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.BranchIndicator :class="cn(styles.branchIndicator(), props.class)">
    <slot />
  </Ark.BranchIndicator>
</template>
