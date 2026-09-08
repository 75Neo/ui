<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FloatingPanel as Ark } from "@ark-ui/vue/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

interface FloatingPanelStageTriggerProps {
  stage: "minimized" | "maximized" | "default";
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatingPanelStageTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.StageTrigger :stage="props.stage" :class="cn(styles.stageTrigger(), props.class)">
    <slot />
  </Ark.StageTrigger>
</template>
