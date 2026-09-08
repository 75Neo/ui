<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = floatingPanel();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
