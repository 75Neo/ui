<script setup lang="ts">
import { computed } from "vue";
import { Checkbox as Ark } from "@ark-ui/vue/checkbox";
import { cva } from "class-variance-authority";
import { cn, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxLabel = cva("block font-medium text-highlighted select-none", {
  variants: { size: checkboxSizeData.label },
  defaultVariants: checkboxDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCheckboxVariants();
const labelClass = computed(() => cn(checkboxLabel(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Label data-slot="checkbox-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
