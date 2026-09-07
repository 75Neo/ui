<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cn } from "cn";
import { checkbox } from "@/registry/shared/lib/checkbox.styles";

interface CheckboxIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CheckboxIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = checkbox();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <slot />
  </Ark.Indicator>
</template>
