<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewBranchTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchTextProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.BranchText :class="cn(styles.branchText(), props.class)">
    <slot />
  </Ark.BranchText>
</template>
