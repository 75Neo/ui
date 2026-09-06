<script setup lang="ts">
import { computed } from "vue";
import { RadioGroup as Ark } from "@ark-ui/vue/radio-group";
import { cva } from "class-variance-authority";
import { cn, radioGroupDefaults, radioGroupSizeData } from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemText = cva("block font-medium text-highlighted select-none", {
  variants: { size: radioGroupSizeData.label },
  defaultVariants: radioGroupDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useRadioGroupVariants();
const itemTextClass = computed(() =>
  cn(radioGroupItemText(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ItemText data-slot="radio-group-item-text" :class="itemTextClass">
    <slot />
  </Ark.ItemText>
</template>
