<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Collapsible as Ark } from "@ark-ui/vue/collapsible";
import { cn } from "cn";
import { collapsibleStyles as styles } from "@/registry/shared/lib/collapsible.styles";

interface CollapsibleIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CollapsibleIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <slot />
  </Ark.Indicator>
</template>
