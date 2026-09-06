<script setup lang="ts">
import { computed } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cva } from "class-variance-authority";
import { cn, marqueeDefaults, marqueeSizeData } from "@75neo/themes";
import { useMarqueeVariants } from "./variants";

const marqueeItem = cva(
  "flex shrink-0 items-center gap-2 rounded-md bg-muted text-toned ring ring-accented select-none ring-inset",
  {
    variants: { size: marqueeSizeData.item },
    defaultVariants: marqueeDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useMarqueeVariants();
const itemClass = computed(() =>
  cn(marqueeItem({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Item data-slot="marquee-item" :class="itemClass">
    <slot />
  </Ark.Item>
</template>
