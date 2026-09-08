<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourTitleProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourTitleProps>();
</script>

<template>
  <Ark.Title :class="cn(styles.title(), props.class)" />
</template>
