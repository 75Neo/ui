<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
