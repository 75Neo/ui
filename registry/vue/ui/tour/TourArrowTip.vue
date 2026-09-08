<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tour as Ark } from "@ark-ui/vue/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

interface TourArrowTipProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TourArrowTipProps>();

const styles = tour();
</script>

<template>
  <Ark.ArrowTip :class="cn(styles.arrowTip(), props.class)" />
</template>
