<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
