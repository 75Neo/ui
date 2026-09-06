<script setup lang="ts">
import { computed } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableCancelTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: editableSizeData.cancelTrigger },
    defaultVariants: editableDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useEditableVariants();
const cancelTriggerClass = computed(() =>
  cn(editableCancelTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CancelTrigger data-slot="editable-cancel-trigger" :class="cancelTriggerClass">
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CancelTrigger>
</template>
