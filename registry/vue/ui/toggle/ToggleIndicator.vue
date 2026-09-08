<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Toggle as Ark } from "@ark-ui/vue/toggle";
import { cn } from "cn";
import { toggleStyles as styles } from "@/registry/shared/lib/toggle.styles";

interface ToggleIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ToggleIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <slot />
  </Ark.Indicator>
</template>
