<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourBackdropProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourBackdropProps>();
</script>

<template>
  <Ark.Backdrop :class="cn(styles.backdrop(), props.class)" />
</template>
