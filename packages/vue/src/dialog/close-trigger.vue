<script setup lang="ts">
import { computed } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogCloseTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: dialogSizeData.closeTrigger },
    defaultVariants: dialogDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const closeTriggerClass = computed(() =>
  cn(dialogCloseTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CloseTrigger
    data-slot="dialog-close-trigger"
    :class="closeTriggerClass"
    aria-label="Close dialog"
  >
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CloseTrigger>
</template>
