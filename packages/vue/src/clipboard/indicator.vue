<script setup lang="ts">
import { type Component, computed } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cva } from "class-variance-authority";
import { Check, Copy } from "@lucide/vue";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardIndicator = cva("shrink-0 [&>svg]:size-full", {
  variants: { size: clipboardSizeData.indicator },
  defaultVariants: clipboardDefaults,
});

const props = defineProps<{
  class?: unknown;
  /** Replaces the copy icon. */
  copyIcon?: Component;
  /** Replaces the icon shown just after a copy. */
  copiedIcon?: Component;
}>();

defineSlots<{
  default?: () => unknown;
  /** Replaces the icon shown just after a copy. Falls back to `copiedIcon`. */
  copied?: () => unknown;
}>();

const variants = useClipboardVariants();
const indicatorClass = computed(() =>
  cn(clipboardIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator data-slot="clipboard-indicator" :class="indicatorClass">
    <slot>
      <component :is="props.copyIcon ?? Copy" />
    </slot>
    <template #copied>
      <slot name="copied">
        <component :is="props.copiedIcon ?? Check" />
      </slot>
    </template>
  </Ark.Indicator>
</template>
