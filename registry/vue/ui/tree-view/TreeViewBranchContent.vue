<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewBranchContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.BranchContent :class="cn(styles.branchContent(), props.class)">
    <slot />
  </Ark.BranchContent>
</template>
