<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelBodyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelBodyProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = floatingPanel();
</script>

<template>
  <Ark.Body :class="cn(styles.body(), props.class)">
    <slot />
  </Ark.Body>
</template>
