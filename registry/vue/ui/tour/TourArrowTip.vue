<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourArrowTipProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourArrowTipProps>();
</script>

<template>
  <Ark.ArrowTip :class="cn(styles.arrowTip(), props.class)" />
</template>
