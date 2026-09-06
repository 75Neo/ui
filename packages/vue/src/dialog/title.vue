<script setup lang="ts">
import { computed } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogTitle = cva("font-semibold text-highlighted", {
  variants: { size: dialogSizeData.title },
  defaultVariants: dialogDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const titleClass = computed(() => cn(dialogTitle(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Title data-slot="dialog-title" :class="titleClass">
    <slot />
  </Ark.Title>
</template>
