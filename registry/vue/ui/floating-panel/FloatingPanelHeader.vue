<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelHeaderProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelHeaderProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = floatingPanel();
</script>

<template>
  <Ark.Header :class="cn(styles.header(), props.class)">
    <slot />
  </Ark.Header>
</template>
