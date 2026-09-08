<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewBranchIndentGuideProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewBranchIndentGuideProps>();

const styles = treeView();
</script>

<template>
  <Ark.BranchIndentGuide :class="cn(styles.branchIndentGuide(), props.class)" />
</template>
