<script setup lang="ts">
import { computed } from "vue";
import { Toast as Ark } from "@ark-ui/vue/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastDescription = cva("opacity-80", {
  variants: { size: toastSizeData.description },
  defaultVariants: toastDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useToastVariants();
const descriptionClass = computed(() =>
  cn(toastDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Description data-slot="toast-description" :class="descriptionClass">
    <slot />
  </Ark.Description>
</template>
