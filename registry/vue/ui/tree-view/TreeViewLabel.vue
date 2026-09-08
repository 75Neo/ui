<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeView } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = treeView();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
