<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, radioGroupDefaults, radioGroupSizeData } from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemDescription = cva("mt-1 text-pretty text-muted", {
  variants: { size: radioGroupSizeData.description },
  defaultVariants: radioGroupDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useRadioGroupVariants();
const itemDescriptionClass = computed(() =>
  cn(radioGroupItemDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <p data-slot="radio-group-item-description" :class="itemDescriptionClass">
    <slot />
  </p>
</template>
