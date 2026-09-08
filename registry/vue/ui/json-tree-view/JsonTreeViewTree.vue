<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { JsonTreeView as Ark } from "@ark-ui/vue/json-tree-view";
import { cn } from "cn";
import { jsonTreeViewStyles as styles } from "@/registry/shared/lib/json-tree-view.styles";

interface JsonTreeViewTreeProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<JsonTreeViewTreeProps>();
</script>

<template>
  <Ark.Tree :class="cn(styles.tree(), props.class)" />
</template>
