<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { Pipette as PipetteIcon } from "@lucide/vue";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerEyeDropperTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md ring ring-accented transition-colors outline-none focus-visible:outline-3 disabled:cursor-not-allowed",
  {
    variants: { size: colorPickerSizeData.eyeDropper },
    defaultVariants: colorPickerDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() =>
  cn(colorPickerEyeDropperTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.EyeDropperTrigger data-slot="color-picker-eye-dropper-trigger" :class="cls">
    <slot>
      <component :is="PipetteIcon" />
    </slot>
  </Ark.EyeDropperTrigger>
</template>
