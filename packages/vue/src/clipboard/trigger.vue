<script setup lang="ts">
import { type Component, computed } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cva } from "class-variance-authority";
import {
  clipboardDefaults,
  clipboardSizeData,
  clipboardTriggerCompoundData,
  cn,
  type ClipboardTriggerProps,
} from "@75neo/themes";
import { useClipboardVariants } from "./variants";
import ClipboardIndicator from "./indicator.vue";

const clipboardTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: clipboardSizeData.trigger,
    },
    compoundVariants: clipboardTriggerCompoundData,
    defaultVariants: clipboardDefaults,
  },
);

const props = defineProps<
  ClipboardTriggerProps<Component> & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useClipboardVariants();
const triggerClass = computed(() =>
  cn(clipboardTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Trigger data-slot="clipboard-trigger" :class="triggerClass">
    <slot />
    <ClipboardIndicator :copy-icon="props.copyIcon" :copied-icon="props.copiedIcon" />
  </Ark.Trigger>
</template>
