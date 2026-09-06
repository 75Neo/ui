<script setup lang="ts">
import { computed } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastRoot = cva(
  "relative flex w-full flex-col items-start rounded-xl bg-default text-default shadow-lg ring ring-accented outline-none data-[type=error]:bg-error data-[type=error]:text-inverted data-[type=error]:ring-error data-[type=success]:bg-success data-[type=success]:text-inverted data-[type=success]:ring-success data-[type=warning]:bg-warning data-[type=warning]:text-inverted data-[type=warning]:ring-warning",
  {
    variants: { size: toastSizeData.base },
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
const rootClass = computed(() => cn(toastRoot(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Root data-slot="toast-root" :class="rootClass">
    <slot />
  </Ark.Root>
</template>
