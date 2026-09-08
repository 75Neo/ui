<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

interface SliderValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderValueTextProps>();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
