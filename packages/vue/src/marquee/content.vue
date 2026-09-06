<script setup lang="ts">
import { computed } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import { cva } from "class-variance-authority";
import { cn, marqueeDefaults, marqueeSideData, marqueeSpeedData } from "@75neo/themes";
import { useMarqueeVariants } from "./variants";

const marqueeContent = cva(
  "items-center [animation-delay:var(--marquee-delay)] [animation-iteration-count:var(--marquee-loop-count)] [animation-timing-function:linear] data-reverse:[animation-direction:reverse] motion-reduce:animate-none",
  {
    variants: {
      side: marqueeSideData.content,
      speed: marqueeSpeedData.content,
    },
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
const contentClass = computed(() =>
  cn(
    marqueeContent({ side: variants.side, speed: variants.speed }),
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.Content data-slot="marquee-content" :class="contentClass">
    <slot />
  </Ark.Content>
</template>
