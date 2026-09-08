<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewBranchTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.BranchText :class="cn(styles.branchText(), props.class)">
    <slot />
  </Ark.BranchText>
</template>
