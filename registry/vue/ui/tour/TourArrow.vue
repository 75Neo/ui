<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
