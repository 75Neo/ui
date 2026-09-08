<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
