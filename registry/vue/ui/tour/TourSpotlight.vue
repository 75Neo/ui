<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourSpotlightProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourSpotlightProps>();

const styles = tour();
</script>

<template>
  <Ark.Spotlight :class="cn(styles.spotlight(), props.class)" />
</template>
