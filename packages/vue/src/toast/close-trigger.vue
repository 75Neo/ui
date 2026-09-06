<script setup lang="ts">
import { computed } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastCloseTrigger = cva(
  "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md opacity-60 outline-current/25 transition-opacity hover:opacity-100 focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: toastSizeData.closeTrigger },
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
const closeTriggerClass = computed(() =>
  cn(toastCloseTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.CloseTrigger
    data-slot="toast-close-trigger"
    :class="closeTriggerClass"
    aria-label="Close toast"
  >
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.CloseTrigger>
</template>
