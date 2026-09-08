<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { JsonTreeView as Ark } from "@ark-ui/vue/json-tree-view";
import { cn } from "cn";
import { jsonTreeView } from "@/registry/shared/lib/json-tree-view.styles";

interface JsonTreeViewProps {
  data: object;
  defaultExpandedDepth?: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<JsonTreeViewProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = jsonTreeView();
</script>

<template>
  <Ark.Root
    :data="props.data"
    :default-expanded-depth="props.defaultExpandedDepth"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
