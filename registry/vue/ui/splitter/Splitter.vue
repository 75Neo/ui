<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Splitter as Ark } from "@ark-ui/vue/splitter";
import type { PanelData } from "@ark-ui/vue/splitter";
import { cn } from "cn";
import { splitter } from "@/registry/shared/lib/splitter.styles";

interface SplitterProps {
  panels: PanelData[];
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

const styles = splitter();
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
