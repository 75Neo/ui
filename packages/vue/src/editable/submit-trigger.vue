<script setup lang="ts">
import { computed } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cva } from "class-variance-authority";
import { Check as CheckIcon } from "@lucide/vue";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableSubmitTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: editableSizeData.submitTrigger },
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
const submitTriggerClass = computed(() =>
  cn(editableSubmitTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.SubmitTrigger data-slot="editable-submit-trigger" :class="submitTriggerClass">
    <slot>
      <component :is="CheckIcon" />
    </slot>
  </Ark.SubmitTrigger>
</template>
