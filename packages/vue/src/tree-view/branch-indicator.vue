<script setup lang="ts">
import { computed } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cva } from "class-variance-authority";
import { ChevronRight as ChevronRightIcon } from "@lucide/vue";
import { cn, treeViewDefaults, treeViewSizeData } from "@75neo/themes";
import { useTreeViewVariants } from "./variants";

const treeViewBranchIndicator = cva(
  "shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-90 [&>svg]:size-full",
  {
    variants: { size: treeViewSizeData.branchIndicator },
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
const branchIndicatorClass = computed(() =>
  cn(treeViewBranchIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.BranchIndicator data-slot="tree-view-branch-indicator" :class="branchIndicatorClass">
    <slot>
      <component :is="ChevronRightIcon" />
    </slot>
  </Ark.BranchIndicator>
</template>
