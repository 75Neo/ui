<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourDescriptionProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourDescriptionProps>();
</script>

<template>
  <Ark.Description :class="cn(styles.description(), props.class)" />
</template>
