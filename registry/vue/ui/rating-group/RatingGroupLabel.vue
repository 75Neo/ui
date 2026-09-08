<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cn } from "cn";
import { ratingGroupStyles as styles } from "@/registry/shared/lib/rating-group.styles";

interface RatingGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<RatingGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
