<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tooltip as Ark } from "@ark-ui/vue/tooltip";
import { cn } from "cn";
import { tooltip } from "@/registry/shared/lib/tooltip.styles";

interface TooltipContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TooltipContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tooltip();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
