<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

interface CarouselIndicatorProps {
  index: number;
  readOnly?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CarouselIndicatorProps>(), {
  readOnly: undefined,
});

const styles = carousel();
</script>

<template>
  <Ark.Indicator
    :index="props.index"
    :read-only="props.readOnly"
    :class="cn(styles.indicator(), props.class)"
  />
</template>
