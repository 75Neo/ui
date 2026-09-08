<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourArrowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourArrowProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tour();
</script>

<template>
  <Ark.Arrow :class="cn(styles.arrow(), props.class)">
    <slot />
  </Ark.Arrow>
</template>
