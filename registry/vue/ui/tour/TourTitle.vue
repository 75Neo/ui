<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourTitleProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tour();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)">
    <slot />
  </Ark.Title>
</template>
