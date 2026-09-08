<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Marquee as Ark } from "@ark-ui/vue/marquee";
import type { MarqueeEdgeProps as ArkEdgeProps } from "@ark-ui/vue/marquee";
import { cn } from "cn";
import { marqueeStyles as styles } from "@/registry/shared/lib/marquee.styles";

interface MarqueeProps {
  defaultPaused?: boolean;
  speed?: number;
  delay?: number;
  spacing?: string;
  loopCount?: number;
  autoFill?: boolean;
  reverse?: boolean;
  pauseOnInteraction?: boolean;
  side?: ArkEdgeProps["side"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  defaultPaused: undefined,
  autoFill: undefined,
  reverse: undefined,
  pauseOnInteraction: undefined,
});

const paused = defineModel<boolean>("paused");

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model:paused="paused"
    :default-paused="props.defaultPaused"
    :speed="props.speed"
    :delay="props.delay"
    :spacing="props.spacing"
    :loop-count="props.loopCount"
    :auto-fill="props.autoFill"
    :reverse="props.reverse"
    :pause-on-interaction="props.pauseOnInteraction"
    :side="props.side"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
