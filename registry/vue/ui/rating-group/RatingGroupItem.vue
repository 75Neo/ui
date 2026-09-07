<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { RatingGroup as Ark } from "@ark-ui/vue/rating-group";
import { cn } from "cn";
import { ratingGroup } from "@/registry/shared/lib/rating-group.styles";

interface RatingGroupItemProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<RatingGroupItemProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = ratingGroup();
</script>

<template>
  <Ark.Item :index="props.index" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
