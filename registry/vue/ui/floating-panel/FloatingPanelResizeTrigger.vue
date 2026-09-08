<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import type { FloatingPanelResizeTriggerProps as ArkResizeTriggerProps } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelResizeTriggerProps {
  axis: ArkResizeTriggerProps["axis"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelResizeTriggerProps>();

const styles = floatingPanel();
</script>

<template>
  <Ark.ResizeTrigger :axis="props.axis" :class="cn(styles.resizeTrigger(), props.class)" />
</template>
