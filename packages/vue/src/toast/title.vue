<script setup lang="ts">
import { computed } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastTitle = cva("font-semibold", {
  variants: { size: toastSizeData.title },
  defaultVariants: toastDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useToastVariants();
const titleClass = computed(() => cn(toastTitle(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Title data-slot="toast-title" :class="titleClass">
    <slot />
  </Ark.Title>
</template>
