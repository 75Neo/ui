<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewItemIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewItemIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.ItemIndicator :class="cn(styles.itemIndicator(), props.class)">
    <slot />
  </Ark.ItemIndicator>
</template>
