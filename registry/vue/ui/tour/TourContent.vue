<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tour();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
