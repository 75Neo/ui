<script setup lang="ts">
import { computed } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cva } from "class-variance-authority";
import { cn, scrollAreaDefaults, scrollAreaSizeData } from "@75neo/themes";
import { useScrollAreaVariants } from "./variants";

const scrollAreaCorner = cva("absolute right-1 bottom-1 rounded-full", {
  variants: { size: scrollAreaSizeData.corner },
  defaultVariants: scrollAreaDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

const variants = useScrollAreaVariants();
const cornerClass = computed(() =>
  cn(scrollAreaCorner(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Corner data-slot="scroll-area-corner" :class="cornerClass" />
</template>
