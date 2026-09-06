<script setup lang="ts">
import { computed } from "vue";
import { Editable as Ark } from "@ark-ui/vue/editable";
import { cva } from "class-variance-authority";
import { Pencil as PencilIcon } from "@lucide/vue";
import { cn, editableDefaults, editableSizeData } from "@75neo/themes";
import { useEditableVariants } from "./variants";

const editableEditTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: editableSizeData.editTrigger },
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
const editTriggerClass = computed(() =>
  cn(editableEditTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.EditTrigger data-slot="editable-edit-trigger" :class="editTriggerClass">
    <slot>
      <component :is="PencilIcon" />
    </slot>
  </Ark.EditTrigger>
</template>
