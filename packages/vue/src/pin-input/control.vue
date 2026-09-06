<script setup lang="ts">
import { computed } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cva } from "class-variance-authority";
import { cn, pinInputDefaults, pinInputSizeData } from "@75neo/themes";
import { usePinInputVariants } from "./variants";

const pinInputControl = cva("flex items-center", {
  variants: { size: pinInputSizeData.control },
  defaultVariants: pinInputDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = usePinInputVariants();
const controlClass = computed(() =>
  cn(pinInputControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="pin-input-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
