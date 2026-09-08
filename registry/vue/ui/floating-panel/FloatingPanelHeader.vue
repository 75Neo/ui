<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelHeaderProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelHeaderProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Header :class="cn(styles.header(), props.class)">
    <slot />
  </Ark.Header>
</template>
