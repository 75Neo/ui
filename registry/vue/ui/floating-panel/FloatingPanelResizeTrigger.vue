<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import type { FloatingPanelResizeTriggerProps as ArkResizeTriggerProps } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelResizeTriggerProps {
  axis: ArkResizeTriggerProps["axis"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelResizeTriggerProps>();
</script>

<template>
  <Ark.ResizeTrigger :axis="props.axis" :class="cn(styles.resizeTrigger(), props.class)" />
</template>
