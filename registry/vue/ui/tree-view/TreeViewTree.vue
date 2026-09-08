<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cn } from "cn";
import { treeViewStyles as styles } from "@/registry/shared/lib/tree-view.styles";

interface TreeViewTreeProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TreeViewTreeProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Tree :class="cn(styles.tree(), props.class)">
    <slot />
  </Ark.Tree>
</template>
