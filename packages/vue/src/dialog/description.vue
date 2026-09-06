<script setup lang="ts">
import { computed } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogDescription = cva("text-muted", {
  variants: { size: dialogSizeData.description },
  defaultVariants: dialogDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const descriptionClass = computed(() =>
  cn(dialogDescription(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Description data-slot="dialog-description" :class="descriptionClass">
    <slot />
  </Ark.Description>
</template>
