<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderMarkerProps {
  value: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<AngleSliderMarkerProps>();
</script>

<template>
  <Ark.Marker :value="props.value" :class="cn(styles.marker(), props.class)" />
</template>
