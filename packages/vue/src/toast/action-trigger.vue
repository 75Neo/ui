<script setup lang="ts">
import { computed } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastActionTrigger = cva(
  "mt-1 inline-flex cursor-pointer items-center justify-center rounded-md font-medium ring ring-current/25 transition-colors hover:bg-current/10 focus-visible:outline-3",
  {
    variants: { size: toastSizeData.actionTrigger },
    defaultVariants: toastDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useToastVariants();
const actionTriggerClass = computed(() =>
  cn(toastActionTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ActionTrigger data-slot="toast-action-trigger" :class="actionTriggerClass">
    <slot />
  </Ark.ActionTrigger>
</template>
