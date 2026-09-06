<script setup lang="ts">
import { computed } from "vue";
import { Dialog as Ark } from "@ark-ui/vue/dialog";
import { cva } from "class-variance-authority";
import { cn } from "@75neo/themes";

const dialogBackdrop = cva("fixed inset-0 bg-inverted/40 backdrop-blur-[2px]", {
  variants: {
    transition: {
      true: "data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in",
      false: "",
    },
  },
  defaultVariants: { transition: true },
});

const props = defineProps<{
  class?: unknown;
  /** @defaultValue `true` */
  transition?: boolean;
}>();

const backdropClass = computed(() =>
  cn(dialogBackdrop({ transition: props.transition }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Backdrop data-slot="dialog-backdrop" :class="backdropClass" />
</template>
