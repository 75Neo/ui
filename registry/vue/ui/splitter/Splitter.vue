<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import type { SplitterRootProps } from "@ark-ui/vue/splitter";
import { cn } from "cn";
import { splitterStyles as styles } from "@/registry/shared/lib/splitter.styles";

interface SplitterProps {
  panels: SplitterRootProps["panels"];
  defaultSize?: number[];
  orientation?: "horizontal" | "vertical";
  keyboardResizeBy?: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<SplitterProps>();

const size = defineModel<number[]>("size");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:size="size"
    :panels="props.panels"
    :default-size="props.defaultSize"
    :orientation="props.orientation"
    :keyboard-resize-by="props.keyboardResizeBy"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
