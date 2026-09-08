<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tourStyles as styles } from "@/registry/shared/lib/tour.styles";

interface TourProgressTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourProgressTextProps>();
</script>

<template>
  <Ark.ProgressText :class="cn(styles.progressText(), props.class)" />
</template>
