<script setup lang="ts">
import { computed } from "vue";
import { ScrollArea as Ark } from "@ark-ui/vue/scroll-area";
import { cva } from "class-variance-authority";
import {
  cn,
  scrollAreaDefaults,
  scrollAreaSizeData,
  type ScrollAreaScrollbarProps,
} from "@75neo/themes";
import { useScrollAreaVariants } from "./variants";
import ScrollAreaThumb from "./thumb.vue";

const scrollAreaScrollbar = cva(
  "absolute touch-none rounded-full opacity-0 transition-opacity duration-150 select-none group-focus-within/scroll-area:opacity-100 group-hover/scroll-area:opacity-100 data-scrolling:opacity-100 data-[orientation=horizontal]:inset-x-2 data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:inset-y-2 data-[orientation=vertical]:right-1 data-[orientation=vertical]:flex-col",
  {
    variants: { size: scrollAreaSizeData.scrollbar },
    defaultVariants: scrollAreaDefaults,
  },
);

const props = defineProps<
  ScrollAreaScrollbarProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useScrollAreaVariants();
const scrollbarClass = computed(() =>
  cn(scrollAreaScrollbar(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Scrollbar
    :orientation="props.orientation"
    data-slot="scroll-area-scrollbar"
    :class="scrollbarClass"
  >
    <slot>
      <ScrollAreaThumb />
    </slot>
  </Ark.Scrollbar>
</template>
