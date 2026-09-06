<script setup lang="ts">
import { computed } from "vue";
import { Switch as Ark } from "@ark-ui/vue/switch";
import { cva } from "class-variance-authority";
import { cn, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchLabel = cva("block font-medium text-highlighted select-none", {
  variants: { size: switchSizeData.label },
  defaultVariants: switchDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSwitchVariants();
const labelClass = computed(() => cn(switchLabel(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Label data-slot="switch-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
