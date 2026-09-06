<script setup lang="ts">
import { computed } from "vue";
import { TreeView as Ark } from "@ark-ui/vue/tree-view";
import { cva } from "class-variance-authority";
import { cn, type TreeViewBranchContentProps } from "@75neo/themes";

const treeViewBranchContent = cva("flex min-w-0 flex-col gap-px overflow-hidden", {
  variants: {
    indentGuide: {
      true: "ms-4 border-s border-muted ps-1.5",
      false: "",
    },
  },
  defaultVariants: { indentGuide: true },
});

const props = withDefaults(
  defineProps<
    TreeViewBranchContentProps & {
      class?: unknown;
    }
  >(),
  { indentGuide: true },
);

defineSlots<{
  default?: () => unknown;
}>();

const branchContentClass = computed(() =>
  cn(treeViewBranchContent({ indentGuide: props.indentGuide }), props.class as string | undefined),
);
</script>

<template>
  <Ark.BranchContent data-slot="tree-view-branch-content" :class="branchContentClass">
    <slot />
  </Ark.BranchContent>
</template>
