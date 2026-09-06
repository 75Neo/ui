<script setup lang="ts">
import { computed } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cva } from "class-variance-authority";
import { cn, treeViewDefaults, treeViewRowCompoundData, treeViewSizeData } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";

const treeViewBranchControl = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 ps-[calc(var(--depth,0)*0.875rem+0.5rem)] text-sm text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:outline-3 focus-visible:outline-primary/25 data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: treeViewSizeData.branchControl,
    },
    compoundVariants: treeViewRowCompoundData,
    defaultVariants: treeViewDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTreeViewVariants();
const branchControlClass = computed(() =>
  cn(treeViewBranchControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.BranchControl data-slot="tree-view-branch-control" :class="branchControlClass">
    <slot />
  </Ark.BranchControl>
</template>
