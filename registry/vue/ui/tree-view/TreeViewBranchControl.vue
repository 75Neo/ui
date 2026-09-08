<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewBranchControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.BranchControl :class="cn(styles.branchControl(), props.class)">
    <slot />
  </Ark.BranchControl>
</template>
