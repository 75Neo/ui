<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourSpotlightProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourSpotlightProps>();
</script>

<template>
  <Ark.Spotlight :class="cn(styles.spotlight(), props.class)" />
</template>
