<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogFooter = cva(
  "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-muted bg-muted/40",
  {
    variants: { size: dialogSizeData.footer },
    defaultVariants: dialogDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDialogVariants();
const footerClass = computed(() => cn(dialogFooter(variants), props.class as string | undefined));
</script>

<template>
  <footer data-slot="dialog-footer" :class="footerClass">
    <slot />
  </footer>
</template>
