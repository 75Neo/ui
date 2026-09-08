<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cn } from "cn";
import { ratingGroupStyles as styles } from "@/registry/shared/lib/rating-group.styles";

interface RatingGroupControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<RatingGroupControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
