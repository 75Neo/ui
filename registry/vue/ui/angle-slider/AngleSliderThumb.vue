<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderThumbProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AngleSliderThumbProps>();
</script>

<template>
  <Ark.Thumb :class="cn(styles.thumb(), props.class)" />
</template>
